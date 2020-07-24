import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/user/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { MealsService } from 'src/app/services/meals/meals.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-meal-modal',
  templateUrl: './meal-modal.component.html',
  styleUrls: ['./meal-modal.component.css']
})
export class MealModalComponent implements OnInit {
  images: any = [];
  myDatat: any;
  mealID: number;
  myOrderParam: any;
  userID: any = null;
  slideConfig =
 {slidesToShow: 1, slidesToScroll: 1, autoplay: true,
 autoplaySpeed: 3500, dots: true, infinite: true,
 arrows: false ,
 responsive: [
  { breakpoint: 1600, settings: { slidesToShow: 1, slidesToScroll: 1, } },
  { breakpoint: 1000, settings: { slidesToShow: 1, slidesToScroll: 1, } },
  { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1, } } ]
};
  constructor( public myModel: BsModalRef,
               public languageService: LanguageService,
               private router: Router,
               public mealsService: MealsService,
               public cartService: CartService,
               private userService: UserService,
               private toastr: ToastrService, ) { }
  slickInit(e) {
    // console.log('slick initialized');
  }
  ngOnInit() {
    if (this.userService.currentUser != null) {
      this.userID = this.userService.currentUser.id;
    }
    this.images.push(this.myDatat.img1);
    if (this.myDatat.img2 != null) {
      this.images.push(environment.api_imges + this.myDatat.img2);
    }
    if (this.myDatat.img3 != null) {
      this.images.push(environment.api_imges + this.myDatat.img3);
    }
    console.log(this.images);
  }
  orderNow(mealID) {
    if (this.userID == null) {
      this.toastr.error('please login before');
     } else if (this.userService.currentUser.type == 'chief') {
      this.toastr.error('chief cannot ordered');
     } else {
    this.myOrderParam = {MealID: mealID, UserID: this.userID, quantity: 1 };
    this.cartService.AddMenutoMyCart(this.myOrderParam).subscribe(res => {
       if (res.Success) {this.toastr.success(res.Message); this.myModel.hide(); } else {this.toastr.error(res.Message); }
     }
   );
 }
}
 addToFavourite(mealID) {
  if (this.userID == null) {
    this.toastr.error('please login before');
   } else if (this.userService.currentUser.type == 'chief') {
    this.toastr.error('chief cannot ordered');
} else {
  this.myOrderParam = {MealID: mealID, UserID: this.userID };
  this.mealsService.AddMealtoMyFavourite(this.myOrderParam).subscribe(
     res => {
      if (res.Success) {
        this.toastr.success(res.Message); } else {
        this.toastr.error(res.Message);
      }
     }
   );
 }
}
  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}, mealID) {
    if (this.userID == null) {
      this.toastr.error('please login before');
     } else if (this.userService.currentUser.type == 'chief') {
      this.toastr.error('chief cannot ordered');
 } else {
      this.myOrderParam = {MealID: mealID, UserID: this.userID, rate: $event.newValue};
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
  openDetails(id) {
    this.myModel.hide();
    this.router.navigate(['/user/meal-details/' + id]);
  }
}
