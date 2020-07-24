import { Component, HostListener, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ChangeAddressComponent } from './change-address/change-address.component';
import { AddAddressComponent } from '../account/add-address/add-address.component';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { PaymentMethodService } from 'src/app/services/user/paymentmethod.service';
import { AddressService } from 'src/app/services/user/Address.service';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { OrderService } from 'src/app/services/user/order.service';
import { ToastrService } from 'ngx-toastr';
import * as moment from 'moment';
import { LocalStorageService } from 'angular-2-local-storage';
import { CartService } from 'src/app/services/user/cart.service';
import { Router } from '@angular/router';
import { Time } from '@angular/common';
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  mytime: any;
  Day: any = [];
  ShowDays: [];
  isWeekelyDeal = false;
  form: FormGroup;
  paymentMethod: any;
  myAddress: any = null;
  loading: boolean;
  loadingtwo: boolean;
  addaddressModel: BsModalRef;
  constructor(
    public modalService: BsModalService,
    private formBuilder: FormBuilder,
    public userService: UserService,
    private toastr: ToastrService,
    public orderService: OrderService,
    public addressService: AddressService,
    public paymentmethodservice: PaymentMethodService,
    public languageService: LanguageService,
    private cartService: CartService,
    private router: Router,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.mytime = moment(new Date()).format('hh:mm:ss');
    this.paymentmethodservice.GetList().subscribe(res => {
      res.Data.map(i => (i.active = true));
      this.paymentMethod = res.Data;
    });
    this.getAddress();
    this.initForm();
  }

  getFromLocalStorage(key: string) {
    return this.localStorageService.get(key) as any;
  }

  checkpromo() {
    if (this.form.value.promocode == null || this.form.value.promocode == '') {
      this.paymentMethod.map(i => (i.active = true));
      this.form.get('dis_count_value').setValue(0);
      this.form.get('dis_count_type').setValue(null);
      this.form.get('promocodeDiscount').setValue(0);
    } else {
      this.orderService.PromoCode(this.form.value.promocode).subscribe(res => {
        if (res.Success == false) {
          this.toastr.error(res.Message);
          this.form.get('promocode').setValue(null);
          this.paymentMethod.map(i => (i.active = true));
          this.form.get('dis_count_value').setValue(0);
          this.form.get('dis_count_type').setValue(null);
          this.form.get('promocodeDiscount').setValue(0);
        } else {
          this.paymentMethod
            .filter(i => i.id == 3)
            .map(i => (i.active = false));
          this.form.get('dis_count_value').setValue(res.Data.dis_count_value);
          this.form.get('dis_count_type').setValue(res.Data.dis_count_type);
          if (res.Data.dis_count_type == 2) {
            this.form
              .get('promocodeDiscount')
              .setValue(res.Data.dis_count_value);
          } else {
            this.form.get('promocodeDiscount').setValue(0);
            const myDisc =
              res.Data.dis_count_value *
              Number(this.localStorageService.get('mycarttotal'));
            console.log(this.localStorageService.get('mycarttotal'), 'll');

            this.form.get('promocodeDiscount').setValue(myDisc / 100);
          }
        }
      });
    }
  }
  DaySelect(e, id) {
    if (e.target.checked == true) {
      this.Day.push(id);
    } else {
      const index = this.Day.indexOf(id);
      this.Day.splice(index, 1);
    }
  }

  getAddress() {
    this.addressService
      .GetList(this.userService.currentUser.id)
      .subscribe(res => {
        this.loading = false;
        if (res.Data.length > 0) {
          this.myAddress = res.Data.find(i => (i.default_address = 1));
          this.form.get('address_id').setValue(this.myAddress.id);
        }
      });
  }

  changeAddress() {
    this.addaddressModel = this.modalService.show(ChangeAddressComponent, {
      initialState: { ID: 0 },
      class: 'modal-sm',
    });
    this.addaddressModel.content.onClose = res => {
      this.getAddress();
    };
  }

  initForm() {
    this.form = this.formBuilder.group({
      note: [null],
      NetTotal: this.localStorageService.get('mycarttotal'),
      promocode: [null],
      promocodeDiscount: [0],
      dis_count_value: [0],
      dis_count_type: [null], // 2- value 1 percentage
      user_id: this.userService.currentUser.id,
      address_id: [null, Validators.required],
      payment_method_id: [1, Validators.required],
      date: [new Date(), Validators.required],
      time: [moment(new Date()).format('hh:mm:ss'), Validators.required],
    });
    this.form.get('promocode').valueChanges.subscribe(promocode => {
      if (promocode == null || promocode == '') {
        this.paymentMethod.map(i => (i.active = true));
        this.form.get('dis_count_value').setValue(0);
        this.form.get('dis_count_type').setValue(null);
        this.form.get('promocodeDiscount').setValue(0);
      }
    });
  }
  public changed(): void {
    this.mytime = moment(this.form.value.time).format('hh:mm:ss');
  }
  close() {}
  save() {
    debugger
    if (
      moment(this.form.value.date).format('YYYY-MM-DD') <
      moment(new Date()).format('YYYY-MM-DD')
    ) {
      this.toastr.error('you cannot select Past Date');
    }  else if (this.form.valid) {
      this.form.value.date = moment(this.form.value.date).format('YYYY-MM-DD');
      this.form.value.time = this.mytime;
      this.orderService.Add(this.form.value).subscribe(res => {
        if (this.form.value.payment_method_id == 2) {
          if (res.Success) {
            this.loadingtwo = true;
            this.cartService.updateCard();
            const dualScreenLeft =
              window.screenLeft != undefined
                ? window.screenLeft
                : window.screenX;
            const dualScreenTop =
              window.screenTop != undefined ? window.screenTop : window.screenY;

            const width = window.innerWidth
              ? window.innerWidth
              : document.documentElement.clientWidth
              ? document.documentElement.clientWidth
              : screen.width;
            const height = window.innerHeight
              ? window.innerHeight
              : document.documentElement.clientHeight
              ? document.documentElement.clientHeight
              : screen.height;

            const left = width / 2 - 900 / 2 + dualScreenLeft;
            const top = height / 2 - 1000 / 2 + dualScreenTop;
            const href = res.Data.payment_url;
            const thisWindow = window.open(
              href,
              'as',
              `scrollbars=yes, width=900, height=1000, top=${top}, left=${left}`
            );

            this.router.navigate(['/user/home']);
            // thisWindow.close {

            //    this.orderService.OrderDetails(res.Data.id,this.userService.currentUser.id).subscribe(res=>{
            //      if(res.Data.is_paid==0){
            //        this.loadingtwo=false
            //       this.toastr.error('you donot compelete order');
            //       this.router.navigate(['/user/home'])
            //      }
            //      else{
            //       this.toastr.error('your order creates sucessfully');
            //       this.router.navigate(['/user/order-details/'+res.Data.id])
            //      }
            //    })
            // };
          } else {
            this.toastr.error(res.Message);
          }
        } else {
          if (res.Success) {
            this.cartService.updateCard();
            this.toastr.success(res.Message);
            this.router.navigate(['/user/order-details/' + res.Data.id]);
          } else {
            this.toastr.error(res.Message);
          }
        }
      });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }

  addNewAddress() {
    this.addaddressModel = this.modalService.show(AddAddressComponent, {
      initialState: { ID: 0 },
      class: 'modal-sm',
    });
    this.addaddressModel.content.onClose = res => {
      this.getAddress();
    };
  }
}