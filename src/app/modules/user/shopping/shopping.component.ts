import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/user/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { SignupComponent } from 'src/app/sharedModules/layouts/signup/signup.component';
import { LoginComponent } from 'src/app/sharedModules/layouts/login/login.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'],
})
export class ShoppingComponent implements OnInit {
  warningModel: BsModalRef;
  myUrl: any;
  loading: boolean;
  loadingtwo = false;
  myOrderParam: any;
  myCardParam: any;
  ExsistData = false;
  myCard: any = [];
  Total: any;
  constructor(
    public cartService: CartService,
    private modalService: BsModalService,
    private userService: UserService,
    private modelService: BsModalService,
    public languageService: LanguageService,
    private toastr: ToastrService,
    private router: Router,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.myUrl = environment.api_imges;
     this.getCard();
  }

  getFromLocalStorage(key: string) {
    return this.localStorageService.get(key) as any;
  }
  getCard() {
    this.myCard = this.localStorageService.get('mycart') as any;
    if (this.myCard == null ) {
      this.myCard = [];
      this.ExsistData = false;
    }
    if (this.myCard.length == 0) {
      this.localStorageService.set('mycart', []);
      this.ExsistData = false;
    } else {
      this.ExsistData = true;
    }
    console.log(this.myCard,"lll");
    
  }
  checkOut() {
    // if (this.userService.currentUser == null) {
    //   this.modalService.show(LoginComponent, {
    //     class: 'modal-lg-width',
    //   });
    // } else {
      this.router.navigate(['/user/checkout']);
    // }
  }
  updateQuantityWithText(row, quantity){
    debugger
    this.loadingtwo = true;
    if (this.userService.currentUser == null) {
        this.myCardParam = {
          ar_name: row.ar_name,
          en_name: row.ar_name,
          ar_description: row.ar_description,
          en_description: row.en_description,
          price: row.price,
          pivot: { quantity, price: row.pivot.price },
          chief: { delivery_fee: row.chief.delivery_fee },
          id: row.id,
          chief_id: row.chief_id,
          img: row.img,
        };
      const n = this.cartService.updateCardStorage(this.myCardParam);
      if (n === true) {
        this.loadingtwo = false;
      }
    } else {
      this.myOrderParam = {
        EntityID: row.id,
        UserID: this.userService.currentUser.id,
        quantity,
       
      };
      this.cartService.updateQuantityWithText(this.myOrderParam).subscribe(res => {
        if (res.Success) {
          this.loadingtwo = false;
          this.cartService.calculateTotal(res.Data);
          this.localStorageService.set('mycart', res.Data);
        }
      });
    }
  }
 
  updateQuantity(row, quantity) {
    this.loadingtwo = true;
    if (this.userService.currentUser == null) {
        this.myCardParam = {
          ar_name: row.ar_name,
          en_name: row.ar_name,
          ar_description: row.ar_description,
        
          en_description: row.en_description,
          price: row.price,
          pivot: { quantity, price: row.pivot.price },
          chief: { delivery_fee: row.chief.delivery_fee },
          id: row.id,
          chief_id: row.chief_id,
          img: row.img,
        };
      const n = this.cartService.updateCardStorage(this.myCardParam);
      if (n === true) {
        this.loadingtwo = false;
      }
    } else {
      this.myOrderParam = {
        EntityID: row.id,
        UserID: this.userService.currentUser.id,
        quantity,
       
      };
      this.cartService.updateQuantity(this.myOrderParam).subscribe(res => {
        if (res.Success) {
          this.loadingtwo = false;
          this.cartService.calculateTotal(res.Data);
          this.localStorageService.set('mycart', res.Data);
        }
      });
    }
  }

  Delete(menuID) {
    this.warningModel = this.modelService.show(WarningComponent, {
      class: 'modal-sm',
    });
    this.warningModel.content.boxObj.msg =this.languageService.getLanguageOrDefault()=='ar'?'هل أنت متأكد أنك تريد حذف؟':
      'Are you sure you want to delete from cart ?';
    this.warningModel.content.onClose = cancel => {
      if (cancel) {
        if (this.userService.currentUser == null) {
          this.cartService.deleteFromCardStorage(menuID);
          this.warningModel.hide();
          this.loading = false;
          this.getCard();
        } else {
          this.myOrderParam = {
            EntityID: menuID,
            UserID: this.userService.currentUser.id,
            
          };
          this.cartService
            .RemovefromMyCart(this.myOrderParam)
            .subscribe(res => {
              if (res.Success) {
                this.toastr.success(res.Message);
                this.warningModel.hide();
                this.localStorageService.set('mycart', res.Data);
                this.cartService.calculateTotal(res.Data);
                this.getCard();
                this.loading = false;
              } else {
                this.toastr.error(res.Message);
              }
            });
        }
      }
    };
  }
}
