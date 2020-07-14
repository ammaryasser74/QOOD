import { Component, OnInit } from '@angular/core';
import { MealsService } from 'src/app/services/meals/meals.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { AddAddressComponent } from './add-address/add-address.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { MealModalComponent } from '../meal-details/meal-modal/meal-modal.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AddressService } from 'src/app/services/user/Address.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { CartService } from 'src/app/services/user/cart.service';
import { BookMarkService } from 'src/app/services/user/bookmark.service';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { OrderService } from 'src/app/services/user/order.service';
import { WeekelyDealsComponent } from '../../chief/weekely-deals/weekely-deals.component';
import { WeekelyDealsService } from 'src/app/services/user/weekely-deals.service';
import { VerficationCodeComponent } from 'src/app/sharedModules/layouts/verfication-code/verfication-code.component';
import { PathLocationStrategy } from '@angular/common';
import { MenuService } from 'src/app/services/user/menu.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  addEditaddressModel: BsModalRef;
  warningModel: BsModalRef;
  form: FormGroup;
  recentOrder: any;
  weekelyDeals: any;
  myFavourite: any;
  myAddress: any;
  myBookmarks: any;
  myWallet: any = 10;
  tab = 1;
  userData: any;
  loading: boolean;
  myavatar: any;
  myavatarDefault: any;
  fileData = null;
  myOrderParam: any;
  loadingtwo = false;
  constructor(
    public MealsService: MealsService,
    public modalService: BsModalService,
    private modelService: BsModalService,
    public localStorageService: LocalStorageService,
    public userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    public languageService: LanguageService,
    public addressService: AddressService,
    private weekelyDealsService: WeekelyDealsService,
    private http: HttpClient,
    private activeRoute: ActivatedRoute,
    public cartService: CartService,
    public orderService: OrderService,
    private menuService:MenuService,
    public bookMarkService: BookMarkService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.tab = +this.activeRoute.snapshot.paramMap.get('id');
    this.initForm();
    this.getuser();
    this.orderService
      .GetList(this.userService.currentUser.id)
      .subscribe(res => {
        this.recentOrder = res.Data;
      });
    this.menuService.MyFavouriteMenu(
      this.userService.currentUser.id
    ).subscribe(res => {
      res.Data.map(i => (i.img = environment.api_imges + i.img));
      this.myFavourite = res.Data;
      console.log(res.Data);
      
      this.myavatar = this.userService.currentUser.avatar;
      this.form.patchValue(this.userService.currentUser);

      this.getBookMarks();
      this.myavatarDefault = this.userService.currentUser.avtar;
      this.getaddress();
    });
  }
  getBookMarks() {
    this.bookMarkService
      .GetList(this.userService.currentUser.id)
      .subscribe(res => {
        this.myBookmarks = res.Data;
      });
  }
  getaddress() {
    this.addressService
      .GetList(this.userService.currentUser.id)
      .subscribe(res => {
        this.myAddress = res.Data;
        this.userData = this.userService.currentUser;
        this.loading = false;
      });
  }

  initForm() {
    this.form = this.formBuilder.group({
      id: [0],
      phone: [null],
      email: [null],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      receive_orders: [null, Validators.required],
      avatar: [null],
      UserID: [null],
    });
  }
  sendverfication() {
  
      let VerficationCodeComponentmodal=  this.modalService.show(VerficationCodeComponent, {
          class: 'modal-dialog-min-width ',
        });
        VerficationCodeComponentmodal.content.onClose = res => {
          this.getuser();
        };
      
  }
  openMealModal(data) {
    this.modalService.show(MealModalComponent, {
      class: 'modal-dialog-min-width ',
      initialState: {
        myDatat: data,
      },
    });
  }
  addToFavourite(MenuID) {
    this.warningModel = this.modelService.show(WarningComponent, {
      class: 'modal-sm',
    });
    this.warningModel.content.boxObj.msg =
      'Are you sure you want to delete from Favourite ?';
    this.warningModel.content.onClose = cancel => {
      if (cancel) {
        this.myOrderParam = {MenuID: MenuID, UserID: this.userService.currentUser.id };
        this.menuService.AddMenutoMyFavourite(this.myOrderParam).subscribe(
          res => {
            if (res.Success) {
              res.Data.map(i => (i.img= environment.api_imges + i.img));
              this.myFavourite = res.Data;
              this.toastr.success(res.Message);
              this.warningModel.hide();
            } else {
              this.toastr.error(res.Message);
            }
          }
        );
      }
    };
  }

  onRate(
    $event: {
      oldValue: number;
      newValue: number;
      starRating: StarRatingComponent;
    },
    mealID
  ) {
    this.loadingtwo = true;
    this.myOrderParam = {
      MealID: mealID,
      UserID: this.userService.currentUser.id,
      rate: $event.newValue,
    };
    this.MealsService.Rate(this.myOrderParam).subscribe(res => {
      if (res.Success) {
        this.toastr.success(res.Message);
        this.loadingtwo = false;
      } else {
        this.toastr.error(res.Message);
      }
    });
  }
  addNewAddress() {
    this.addEditaddressModel = this.modalService.show(AddAddressComponent, {
      initialState: { ID: 0 },
      class: 'modal-sm',
    });
    this.addEditaddressModel.content.onClose = res => {
      this.getaddress();
    };
  }

  updateAddress(addressID) {
    this.addEditaddressModel = this.modalService.show(AddAddressComponent, {
      initialState: { ID: addressID },
      class: 'modal-sm',
    });
    this.addEditaddressModel.content.onClose = res => {
      this.getaddress();
    };
  }

  changePasswort() {
    this.modalService.show(ResetPasswordComponent);
  }

  setDefaultaddress(row) {
    row.default_address = 1;
    row.user_id = this.userService.currentUser.id;
    this.addressService.Update(row).subscribe(res => {
      if (res.Success) {
        this.toastr.success(res.Message);
        this.getaddress();
      } else {
        this.toastr.error(res.Message);
        row.default_address = 0;
      }
    });
  }

  getFromLocalStorage(key: string) {
    return this.localStorageService.get(key) as any;
  }

  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = event.target.files[0] as File;
      reader.onload = (event: any) => {
        this.myavatar = event.target.result;
      };
    }
  }

  onSubmit() {
    if (this.fileData == null) {
      this.toastr.error('اختر صوره اولا');
    } else {
      const formData = new FormData();
      formData.append('avatar', this.fileData);
      formData.append('UserID', this.userService.currentUser.id);
      this.http
        .request(
          new HttpRequest(
            'POST',
            `${environment.api_url}/User/UploadImage`,
            formData,
            { reportProgress: true }
          )
        )
        .subscribe(event => {
          if (event.type == 3) {
            this.toastr.success('Image uploaded Sucessfully');
            this.getuser();
          }
        });
    }
  }
  getuser() {
    this.userService.GetByID(this.userService.currentUser.id).subscribe(res => {
      this.localStorageService.set('currentUser', res.Data);
      this.myavatar = this.userService.currentUser.avatar;
      this.userData=this.userService.currentUser
    });
  }
  update() {
    if (this.form.valid) {
      this.userService.Update(this.form.value).subscribe(res => {
        if (res.Success) {
          this.localStorageService.set('currentUser', res.Data);
          this.userData = res.Data;
          this.toastr.success(res.Message);
          this.form.patchValue(res.Data);
        } else {
          this.toastr.error(res.Message);
        }
      });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }

  deleteAddress(addressID) {
    this.warningModel = this.modelService.show(WarningComponent, {
      class: 'modal-sm',
    });
    this.warningModel.content.boxObj.msg =
      'Are you sure you want to delete Address ?';
    this.warningModel.content.onClose = cancel => {
      if (cancel) {
        this.addressService
          .Delete(addressID, this.userService.currentUser.id)
          .subscribe(res => {
            if (res.Success) {
              this.addressService
                .GetList(this.userService.currentUser.id)
                .subscribe(res => {
                  this.myAddress = res.Data;
                  this.warningModel.hide();
                });
              this.toastr.success(res.Message);
              this.myAddress = res.Data;
            } else {
              this.toastr.error(res.Message);
            }
          });
      }
    };
  }

  addBookMark(ChiefID) {
    this.warningModel = this.modelService.show(WarningComponent, {
      class: 'modal-sm',
    });
    this.warningModel.content.boxObj.msg =
      'Are you sure you want to delete from bookmarks ?';
    this.warningModel.content.onClose = cancel => {
      if (cancel) {
        this.myOrderParam = {
          ChiefID,
          UserID: this.userService.currentUser.id,
        };
        this.bookMarkService.Post(this.myOrderParam).subscribe(res => {
          if (res.Success) {
            this.myBookmarks = res.Data;
            this.warningModel.hide();
            this.toastr.success(res.Message);
          } else {
            this.toastr.error(res.Message);
          }
        });
      }
    };
  }
}
