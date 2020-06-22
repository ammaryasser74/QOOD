import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/user/categories.service';
import { LanguageService } from 'src/app/services/language.service';
import { CityService } from 'src/app/services/user/city.service';
import { BrandService } from 'src/app/services/user/brand.service';
import { MealsService , MealFilter} from 'src/app/services/meals/meals.service';
import { BsModalService } from 'ngx-bootstrap';
import { MealModalComponent } from '../meal-details/meal-modal/meal-modal.component';
import { SettingService } from 'src/app/services/user/setting.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { StarRatingComponent } from 'ng-starrating';
import { CartService } from 'src/app/services/user/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { SubLayoutService } from 'src/app/services/sub-layout.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  filter: MealFilter = {};
  loading: boolean;
  form: FormGroup;
  slideConfig =
 {slidesToShow: 3, slidesToScroll: 3, autoplay: false,
 autoplaySpeed: 3500, dots: true, infinite: true,
 arrows: true ,
 responsive: [
  { breakpoint: 1600, settings: { slidesToShow: 3, slidesToScroll: 3, } },
  { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 2, } },
  { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, } } ]
};
categories: any;
userID: any = null;
cities: any;
brands: any;
myUrl: any;
loadingtwo = false;
newMeal: any[] = [];
myOrderParam: any;
popularMeal: any[] = [];
subLayoutEvent: Subscription;
  constructor(public categoryService: CategoryService,
              public languageService: LanguageService,
              public subLayoutService: SubLayoutService,
              public cityService: CityService,
              public brandService: BrandService,
              public mealsService: MealsService,
              private modalService: BsModalService,
              public settingService: SettingService,
              private toastr: ToastrService,
              private formBuilder: FormBuilder,
              public cartService: CartService,
              private userService: UserService,
              private router: Router, ) { }
    slickInit(e) {
    }
   ngOnInit() {
    this.userService.checkmyToken();
    this.myUrl = environment.api_imges;
    this.subLayoutService.broadcast(true);
    if (this.userService.currentUser != null) {
      this.userID = this.userService.currentUser.id;
    }
    this.filter.category_id = 0;

    this.initForm();
    this.loading = true;
    this.categoryService.GetList().subscribe(res => {this.categories = res.Data; });
    this.cityService.GetList().subscribe(res => {this.cities = res.Data; });
    this.brandService.GetList().subscribe(res => {this.brands = res.Data; });
    this.mealsService.NewMeal(this.userID).subscribe(res => {res.Data.map(i => i.img1 = environment.api_imges + i.img1);
                                                             this.newMeal = res.Data;
                                                             this.mealsService.PopularMeal(this.userID).subscribe(
      res => {
        res.Data.map(i => i.img1 = environment.api_imges + i.img1);
        this.popularMeal = res.Data;
      }); });
    this.loading = false;
    this.filter.city_id = 1;
  }
  subscribe() {
    if (this.form.valid) {
     this.settingService.subscribe(this.form.value).subscribe(
       res => {
          if (res.Success) {this.toastr.success(res.Message); this.form.reset(); } else {this.toastr.error(res.Message); }
       });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
 }
 addToFavourite(mealID) {
   if (this.userID == null) {
    this.toastr.error('please login before');
   } else if (this.userService.currentUser.type == 'chief') {
    this.toastr.error('chief cannot ordered');
} else {
    this.myOrderParam = {MealID: mealID, UserID: this.userService.currentUser.id};
    this.mealsService.AddMealtoMyFavourite(this.myOrderParam).subscribe(
       res => {
        if (res.Success) {
          this.toastr.success(res.Message);
          if (res.Data.filter(i => i.id == mealID).length > 0) {
            const myarr = res.Data.filter(i => i.id == mealID);
            this.popularMeal.filter(i => i.id == mealID).map(i => i.customers = myarr[0].customers);
            this.newMeal.filter(i => i.id == mealID).map(i => i.customers = myarr[0].customers);
          } else {
            this.popularMeal.filter(i => i.id == mealID).map(i => i.customers = []);
            this.newMeal.filter(i => i.id == mealID).map(i => i.customers = []);
          }

     } else {
          this.toastr.error(res.Message);
        }
       });
   }

 }
  initForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
    });
  }

search() {
  this.router.navigate(['/user/search/' + this.filter.city_id + '/' + this.filter.category_id + '/' + 0]);
}
  openMealModal(data) {
    this.modalService.show(MealModalComponent, {class: 'min-modal',
      initialState: {
        myDatat: data,
      }
    });
  }
  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}, mealID) {
    if (this.userID == null) {
      this.toastr.error('please login before');
     } else if (this.userService.currentUser.type == 'chief') {
      this.toastr.error('chief cannot ordered');
 } else {
      this.loadingtwo = true;
      this.myOrderParam = {MealID: mealID, UserID: this.userService.currentUser.id, rate: $event.newValue};
      this.mealsService.Rate(this.myOrderParam).subscribe(
         res => {
          if (res.Success) {
            this.toastr.success(res.Message);
            this.loadingtwo = false; } else {
            this.toastr.error(res.Message);
          }
         }
       );
  }}
}



