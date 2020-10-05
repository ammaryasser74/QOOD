import { Component, OnInit } from '@angular/core';
import { LanguageService } from 'src/app/services/language.service';
import { CityService } from 'src/app/services/user/city.service';
import { CategoryService } from 'src/app/services/user/categories.service';

import { MealsService , MealFilter} from 'src/app/services/meals/meals.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { MealModalComponent } from '../meal-details/meal-modal/meal-modal.component';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/user/cart.service';
import { Options } from 'ng5-slider';
import { KitchenComponent } from '../../chief/kitchen/kitchen.component';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { BookMarkService } from 'src/app/services/user/bookmark.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from 'src/environments/environment';
import { MenuService } from 'src/app/services/user/menu.service';
import { OccasionService } from 'src/app/services/user/occasion.service';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  warningModel: BsModalRef;
  options: Options = {
    floor: 1,
    ceil: 2000,
    selectionBarGradient: {from: 'white', to: '#7FB017'},
    getPointerColor: (): string => {return '#7FB017';
  }
  };
  filter: MealFilter = {min_price: 1, max_price: 2000, UserID: null, city_id: 0, day_id: [], category_id: 0, filterType: 0, occasion_id: []};
  categories: any;
  cities: any;
  cusines: any;
  myOrderParam: any;
  myCardParam: any;
  Days: any;
  kitchens: any;
  loading: boolean;
  loadingKichen: boolean;
  DataKitchen: any;
  Data: any[]=[];
  tab = 1;
  listOrGrid: any;
  Total: number;
  constructor( public languageService: LanguageService,
               public cityService: CityService,
               private modelService: BsModalService,
               public categoryService: CategoryService,
               public occasionService: OccasionService,
               public mealsService: MealsService,
               private activatedRoute: ActivatedRoute,
               private userService: UserService,
               private modalService: BsModalService,
               private toastr: ToastrService,
               public cartService: CartService,
               public kitchenService: KitchenService,
               public bookMarkService: BookMarkService,
               private menuService:MenuService,
               public localStorageService: LocalStorageService
    ) { }
  ngOnInit() {
    if (this.userService.currentUser != null) {
      this.filter.UserID = this.userService.currentUser.id;
    }
    this.kitchenService.Days().subscribe(res => {this.Days = res.Data; });
    this.kitchenService.GetList().subscribe(res => {this.kitchens = res.Data; });
    this.activatedRoute.params.subscribe(param => {
    this.filter.category_id = param.catID;
    this.filter.city_id = param.cityID;
    this.filter.KitchenID = param.kitchenID;
    });
    this.listOrGrid = 'product-view grid-view';
    this.categoryService.GetList().subscribe(res => {this.categories = res.Data; });
    this.cityService.GetList().subscribe(res => {this.cities = res.Data; });
    this.occasionService.GetList().subscribe(res => {this.cusines = res.Data; });
    this.loadingKichen = true;
    if (this.filter.KitchenID > 0) {
      this.kitchenService.GetByID(this.filter.UserID, this.filter.KitchenID).subscribe(
        res => {
          this.loadingKichen = false;
          this.DataKitchen = res.Data;
        });
    }
   this.getFilterData();
  }
  getFilterData() {
    this.loading = true;
    this.menuService.Filter(this.filter).subscribe(res => {
      res.Data.map(i => i.img = environment.api_imges + i.img);
      this.Data = res.Data;
      this.loading = false;  console.log(this.Data,"DATA");});
   
    
  }
  arrangeDataASC() {
    if (this.filter.filterType == 1) {
      this.Data.sort((a, b) => (a.price_of_person > b.price_of_person) ? 1 : -1);
    } else {
      this.Data.sort((a, b) => (a.price_of_person < b.price_of_person) ? 1 : -1);
    }
  }
  cusinesSelect(e, id) {
    if (e.target.checked == true) {
     this.filter.occasion_id.push(id);
     this.getFilterData();
    } else {
      const index = this.filter.occasion_id.indexOf(id);
      this.filter.occasion_id.splice(index, 1);
      this.getFilterData();
    }
  }
  DaySelect(e, id) {
    if (e.target.checked == true) {
     this.filter.day_id.push(id);
     this.getFilterData();
    } else {
      const index = this.filter.day_id.indexOf(id);
      this.filter.day_id.splice(index, 1);
      this.getFilterData();
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
    console.log(row.img,"llll","DODOD");
    row.img.replace(row.img,'https://backend-qoot.qoot.online/', '')
    console.log(row.img,"llll","DODOD");
    
    if (this.filter.UserID == null) {
     this.myCardParam = {ar_name: row.ar_name, en_name: row.ar_name, ar_description: row.ar_description, en_description: row.en_description, price: row.price_of_person,
      pivot: {quantity:row.min_no_persons , price: row.price_of_person}, chief: {delivery_fee: row.chief.delivery_fee},
      id: row.id, chief_id: row.chief.id, img: row.img.replace('https://catering.qoot.online/', '')};
     const n = this.cartService.updateCardStorage(this.myCardParam);
     if (n === true) {
        this.toastr.success('add Sucessfully to your card');
      } else {
        this.warningModel = this.modelService.show(WarningComponent, { class: 'modal-sm' });
        this.warningModel.content.boxObj.msg = 'cannot add to your cart must be from one kitchen do you want delete all cart';
        this.warningModel.content.onClose = (cancel) => {
          if (cancel) {
            this.localStorageService.set('mycart', null);
            this.cartService.mynewData =[];
            this.localStorageService.set('mycarttotal', null);
            this.toastr.success('تم الحذف بنجاح');
            this.warningModel.hide();
             }
          };
      }
    } else if (this.userService.currentUser.type == 'chief') {
          this.toastr.error('chief cannot ordered');
     } else {
      this.myOrderParam = {MenuID: row.id, UserID: this.userService.currentUser.id, quantity: 1 };
      this.cartService.AddMenutoMyCart(this.myOrderParam).subscribe(res => {
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
                      this.cartService.AddMenutoMyCart(this.myOrderParam).subscribe(
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
 addBookMark() {
  if (this.filter.UserID == null) {
    this.toastr.error('please login before');
   } else {
    this.myOrderParam = {ChiefID: this.filter.KitchenID, UserID: this.filter.UserID};
    this.bookMarkService.Post(this.myOrderParam).subscribe(res => {
      if (res.Success) {
      this.toastr.success(res.Message); } else {
      this.toastr.error(res.Message);
    }});
  }}
  addToFavourite(MenuID) {
    if (this.filter.UserID == null) {
      this.toastr.error('please login before');
     } else {
    this.myOrderParam = {MenuID: MenuID, UserID: this.userService.currentUser.id };
    this.menuService.AddMenutoMyFavourite(this.myOrderParam).subscribe(
       res => {
        if (res.Success) {
          if (res.Data.filter(i => i.id == MenuID).length > 0) {
            const myarr = res.Data.filter(i => i.id == MenuID);
            this.Data.filter(i => i.id == MenuID).map(i => i.customers = myarr[0].customers);
          } else {
            this.Data.filter(i => i.id == MenuID).map(i => i.customers = []);
          }
          this.toastr.success(res.Message); } else {
          this.toastr.error(res.Message);
        }
       }
     );
   }}
   onRatekitchen($event: {oldValue: number, newValue: number}, ChiefID) {
    if (this.filter.UserID == null) {
      this.toastr.error('please login before');
     } else {
    this.myOrderParam = {ChiefID, UserID: this.userService.currentUser.id, rate: $event.newValue};
    this.kitchenService.Rate(this.myOrderParam).subscribe(
      res => {
       if (res.Success) {
         this.toastr.success(res.Message);
        } else {
         this.toastr.error(res.Message);
       }
      }
    );
}}

  onRate($event: {oldValue: number, newValue: number}, mealID) {
    if (this.filter.UserID == null) {
      this.toastr.error('please login before');
     } else {
    this.myOrderParam = {MealID: mealID, UserID: this.userService.currentUser.id, rate: $event.newValue};
    this.mealsService.Rate(this.myOrderParam).subscribe(
      res => {
       if (res.Success) {
         this.toastr.success(res.Message);
        } else {
         this.toastr.error(res.Message);
       }
      }
    );
}}
}
