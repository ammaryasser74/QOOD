import { Component, OnInit } from '@angular/core';
import { MealsService } from 'src/app/services/meals/meals.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LanguageService } from 'src/app/services/language.service';
import { StarRatingComponent } from 'ng-starrating';
import { CartService } from 'src/app/services/user/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { SettingService } from 'src/app/services/user/setting.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { WeekelyDealsService } from 'src/app/services/user/weekely-deals.service';
import { DayDishModalComponent } from './day-dish-modal/day-dish-modal.component';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/services/user/menu.service';
@Component({
  selector: 'app-deal',
  templateUrl: './deal.component.html',
  styleUrls: ['./deal.component.css'],
})
export class DealComponent implements OnInit {
  Data: any;
  form: FormGroup;
  formComment: FormGroup;
  loading: boolean;
  myOrderParam: any;
  userID: any = null;
  myCardParam: any;
  myURL: any;
  warningModel: BsModalRef;
  URLrouters: any[] = this.router.url.split('/');
  constructor(
    public mealsService: MealsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public languageService: LanguageService,
    public cartService: CartService,
    public localStorageService: LocalStorageService,
    private weekelyDealsService: WeekelyDealsService,
    private userService: UserService,
    private toastr: ToastrService,
    private modelService: BsModalService,
    private formBuilder: FormBuilder,
    public settingService: SettingService,
    private modalService: BsModalService,
    public menuService:MenuService
  ) {}
  ngOnInit() {
    this.myURL = environment.api_imges;
    this.loading = true;
    this.initFormComment();
    if (this.userService.currentUser != null) {
      this.userID = this.userService.currentUser.id;
    }
    this.initForm();
    this.menuService
      .GetByID(+this.activeRoute.snapshot.paramMap.get('id'), this.userID)
      .subscribe(res => {
        this.Data = res.Data;
        this.loading = false;
      });
  }
  SubscribDeal(row) {
    this.toastr.success("تم الاشتراك بنجاح");
    // if (this.userService.currentUser == null) {
    //   const factor = row.subscription_type == 7 ? 1 : 4;
    //   this.myCardParam = {
    //     ar_name: row.ar_name,
    //     en_name: row.ar_name,
    //     ar_description: row.ar_description,
    //     Type: 'WeeklyDeal',
    //     en_description: row.en_description,
    //     price: row.price,
    //     pivot: { quantity: 1, price: row.price },
    //     chief: {
    //       delivery_fee: row.chief.delivery_fee * row.days.length * factor,
    //     },
    //     id: row.id,
    //     chief_id: row.chief_id,
    //     img: [row.img.replace('https://backend-qoot.qoot.online', '')],
    //   };
    //   const n = this.cartService.updateCardStorage(this.myCardParam);
    //   if (n == true) {
    //     this.toastr.success('add susufully to your card');
    //   } else {
    //     this.warningModel = this.modelService.show(WarningComponent, {
    //       class: 'modal-sm',
    //     });
    //     this.warningModel.content.boxObj.msg =
    //       'cannot add to your cart must be from one kitchen do you want delete all cart';
    //     this.warningModel.content.onClose = cancel => {
    //       if (cancel) {
    //         this.localStorageService.set('mycart', null);
    //         this.cartService.mynewData = { weeklydeals: [], dishes: [] };
    //         this.localStorageService.set('mycarttotal', null);
    //         this.toastr.success('تم الحذف بنجاح');
    //         this.warningModel.hide();
    //       }
    //     };
    //   }
    // } else if (this.userService.currentUser.type == 'chief') {
    //   this.toastr.error('chief cannot ordered');
    // } else {
    //   this.myOrderParam = {
    //     WeeklyDealID: row.id,
    //     UserID: this.userService.currentUser.id,
    //     quantity: 1,
    //   };
    //   this.cartService
    //     .addWeeklyDealtoMyCart(this.myOrderParam)
    //     .subscribe(res => {
    //       if (res.Success) {
    //         this.toastr.success(res.Message);
    //         this.cartService.updateCard();
    //       } else {
    //         this.warningModel = this.modelService.show(WarningComponent, {
    //           class: 'modal-sm',
    //         });
    //         this.warningModel.content.boxObj.msg = res.Message;
    //         this.warningModel.content.onClose = cancel => {
    //           if (cancel) {
    //             this.cartService
    //               .DeleteMyCart(this.userService.currentUser.id)
    //               .subscribe(res => {
    //                 if (res.Success) {
    //                   this.cartService.updateCard();
    //                   this.toastr.success(res.Message);
    //                   this.warningModel.hide();
    //                   this.cartService
    //                     .addWeeklyDealtoMyCart(this.myOrderParam)
    //                     .subscribe(resData => {
    //                       this.toastr.success(resData.Message);
    //                       this.cartService.updateCard();
    //                       this.loading = false;
    //                     });
    //                 } else {
    //                   this.toastr.error(res.Message);
    //                 }
    //               });
    //           }
    //         };
    //       }
    //     });
    // }
  }
  initForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
    });
  }
  initFormComment() {
    this.formComment = this.formBuilder.group({
      Comment: [null, Validators.required],
      UserID: [null],
      DishID: [null],
    });
  }
  subscribe() {
    if (this.form.valid) {
      this.settingService.subscribe(this.form.value).subscribe(res => {
        if (res.Success) {
          this.toastr.success(res.Message);
          this.form.reset();
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
  sendComment() {
    if (this.userID == null) {
      this.toastr.error('please login before');
    } else {
      if (this.formComment.valid) {
        this.formComment.value.UserID = this.userService.currentUser.id;
        (this.formComment.value.DishID = this.Data.id),
          this.mealsService
            .AddComment(this.formComment.value)
            .subscribe(res => {
              if (res.Success) {
                this.toastr.success(res.Message);
                this.formComment.reset();
              } else {
                this.toastr.error(res.Message);
              }
            });
      } else {
        for (const control in this.formComment.controls) {
          this.formComment.get(control).markAsDirty();
        }
      }
    }
  }

  openDishDayModal(data) {
    this.modalService.show(DayDishModalComponent, {
      class: 'min-modal',
      initialState: {
        myData: data.dishes,
      },
    });
  }
  addToFavourite(mealID) {
    if (this.userID == null) {
      this.toastr.error('please login before');
    } else {
      this.myOrderParam = {
        MealID: mealID,
        UserID: this.userService.currentUser.id,
      };
      this.mealsService
        .AddMealtoMyFavourite(this.myOrderParam)
        .subscribe(res => {
          if (res.Success) {
            this.toastr.success(res.Message);
          } else {
            this.toastr.error(res.Message);
          }
        });
    }
  }
}
