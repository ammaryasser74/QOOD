import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LanguageService } from 'src/app/services/language.service';
import { StarRatingComponent } from 'ng-starrating';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/user/cart.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { MealsService } from 'src/app/services/meals/meals.service';
import { WeekelyDealsService } from 'src/app/services/user/weekely-deals.service';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-day-dish-modal',
  templateUrl: './day-dish-modal.component.html',
  styleUrls: ['./day-dish-modal.component.css']
})
export class DayDishModalComponent implements OnInit {
  Data: any;
  myData: any;
  mealID: number;
  myOrderParam: any;
  loading = true;
  userID: any = null;
  myURL: any;
  slideConfig =
 {slidesToShow: 1, slidesToScroll: 1, autoplay: false,
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
               private weekelyDealsService: WeekelyDealsService,
               private toastr: ToastrService, ) { }
  slickInit(e) {
    console.log('slick initialized');
  }
  ngOnInit() {
    this.myURL = environment.api_imges;
    this.loading = true;
    if (this.userService.currentUser != null) {
      this.userID = this.userService.currentUser.id;
    }
    this.myOrderParam = {DayID: this.myData.day_id, WeeklyDealID: this.myData.weekly_deal_id};
    this.weekelyDealsService.GetishDay(this.myOrderParam).subscribe(
      res => {
        this.loading = false;
        this.Data = res.Data;
      }
    );
  }
  openDetails(id) {
    this.myModel.hide();
    this.router.navigate(['/user/meal-details/' + id]);
  }
}
