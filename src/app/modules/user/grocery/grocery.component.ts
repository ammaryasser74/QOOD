
import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { MealModalComponent } from '../meal-details/meal-modal/meal-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/user/cart.service';
import { Options } from 'ng5-slider';

import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { BookMarkService } from 'src/app/services/user/bookmark.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from 'src/environments/environment';
import { GroceryService,Filter } from 'src/app/services/user/grocery.service';
import { MealsService } from 'src/app/services/meals/meals.service';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  warningModel: BsModalRef;
  options: Options = {
    floor: 1,
    ceil: 2000,
    selectionBarGradient: {from: 'white', to: '#7FB017'},
    getPointerColor: (): string => {return '#7FB017';
  }
  };
  filter: Filter = {min_price: 1, max_price: 2000, UserID: null,category_id: 0, SearchField:'',per_page:9,current_page: 1,filterType:0};
  categories: any;
  cities: any;
  Category: any;
  myOrderParam: any;
  myCardParam: any;
  kitchens: any;
  loading: boolean;
  loadingKichen: boolean;
  DataKitchen: any;
  Data: any;
  tab = 1;
  listOrGrid: any;
  Total: number;
  constructor( public languageService: LanguageService,
               private modelService: BsModalService,
               public mealsService:MealsService,
               public groceryService: GroceryService,
               private activatedRoute: ActivatedRoute,
               private userService: UserService,
               private modalService: BsModalService,
               private toastr: ToastrService,
               public cartService: CartService,
               public bookMarkService: BookMarkService,
               public localStorageService: LocalStorageService
    ) { }
  ngOnInit() {
    if (this.userService.currentUser != null) {
      this.filter.UserID = this.userService.currentUser.id;
    }
    this.listOrGrid = 'product-view grid-view';
    this.groceryService.Category().subscribe(res => {this.categories = res.Data; });
    this.getFilterData();
  }
  getFilterData() {
    this.loading = true;
    this.groceryService.Filter(this.filter).subscribe(res => { 
      res.Data.data.map(i => i.img1 = environment.api_imges + i.img1);
      this.Data = res.Data;
      this.loading = false; });
  }
  arrangeDataASC() {
    if (this.filter.filterType == 1) {
      this.Data.data.sort((a, b) => (a.price > b.price) ? 1 : -1);
    } else {
      this.Data.data.sort((a, b) => (a.price < b.price) ? 1 : -1);
    }
  }


  gridOrList(type) {
    if (type == 1) {this.listOrGrid = 'product-view list-view'; this.tab = 2; } else {this.listOrGrid = 'product-view grid-view'; this.tab = 1; }
  }
  openMealModal(data) {
    this.modalService.show(MealModalComponent, {class: 'min-modal',
      initialState: {
        myDatat: data,
      }
    });
  }

  orderNow(row) {
    if (this.filter.UserID == null) {
     this.myCardParam = {ar_name: row.ar_name, en_name: row.ar_name, ar_description: row.ar_description, Type: 'Dish', en_description: row.en_description, price: row.price,
      pivot: {quantity: 1, price: row.price}, chief: {delivery_fee: row.chief.delivery_fee},
      id: row.id, chief_id: row.chief_id, img1: row.img1.replace('https://backend-qoot.qoot.online', '')};
     const n = this.cartService.updateCardStorage(this.myCardParam);
     if (n === true) {
        this.toastr.success('add Sucessfully to your card');
      } else {
        this.warningModel = this.modelService.show(WarningComponent, { class: 'modal-sm' });
        this.warningModel.content.boxObj.msg = 'cannot add to your cart must be from one kitchen do you want delete all cart';
        this.warningModel.content.onClose = (cancel) => {
          if (cancel) {
            this.localStorageService.set('mycart', null);
            this.cartService.mynewData = {weeklydeals: [], dishes: []};
            this.localStorageService.set('mycarttotal', null);
            this.toastr.success('تم الحذف بنجاح');
            this.warningModel.hide();
             }
          };
      }
    } else if (this.userService.currentUser.type == 'chief') {
          this.toastr.error('chief cannot ordered');
     } else {
      this.myOrderParam = {MealID: row.id, UserID: this.userService.currentUser.id, quantity: 1 };
      this.cartService.AddDishtoMyCart(this.myOrderParam).subscribe(res => {
          if (res.Success) {
            this.toastr.success(res.Message);
            this.cartService.updateCard();
          } else {
            this.warningModel = this.modelService.show(WarningComponent, { class: 'modal-sm' });
            this.warningModel.content.boxObj.msg = res.Message;
            this.warningModel.content.onClose = (cancel) => {
              if (cancel) {
                 this.cartService.DeleteMyCart(this.userService.currentUser.id).subscribe(
                   res => {
                    if (res.Success) {
                      this.cartService.updateCard();
                      this.toastr.success(res.Message);
                      this.warningModel.hide();
                      this.cartService.AddDishtoMyCart(this.myOrderParam).subscribe(
                        resData => {
                          this.toastr.success(resData.Message);
                          this.cartService.updateCard();
                          this.loading = false;
                        });
                    } else {
                      this.toastr.error(res.Message);
                    }}); }
                  };
          }
        });
     }

 }

  addToFavourite(mealID) {
    if (this.filter.UserID == null) {
      this.toastr.error('please login before');
     } else {
    this.myOrderParam = {MealID: mealID, UserID: this.userService.currentUser.id };
    this.mealsService.AddMealtoMyFavourite(this.myOrderParam).subscribe(
       res => {
        if (res.Success) {
          if (res.Data.filter(i => i.id == mealID).length > 0) {
            const myarr = res.Data.filter(i => i.id == mealID);
            this.Data.filter(i => i.id == mealID).map(i => i.customers = myarr[0].customers);
          } else {
            this.Data.filter(i => i.id == mealID).map(i => i.customers = []);
          }
          this.toastr.success(res.Message); } else {
          this.toastr.error(res.Message);
        }
       }
     );
   }}
   pageChanged(event: any): void {
     console.log(event.page,"lll");
    this.filter.current_page = event.page;
    this.getFilterData();
   }
}
