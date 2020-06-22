import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/user/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
import { MealsService } from 'src/app/services/meals/meals.service';
import { StarRatingComponent } from 'ng-starrating';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  loading: boolean;
  Data: any;
  myOrderParam: any;
  constructor(private oderservice: OrderService,
              private toastr: ToastrService,
              public mealsService: MealsService,
              private localStorageService: LocalStorageService,
              private activeRoute: ActivatedRoute,
              private userService: UserService,
              public languageService: LanguageService,
              private router: Router) { }

  ngOnInit() {
   this.loading = true;
   this.getOrder();

  }
  getOrder() {
    this.oderservice.OrderDetails(+this.activeRoute.snapshot.paramMap.get('id'), this.userService.currentUser.id)
    .subscribe(res => {this.Data = res.Data;
                       this.loading = false; });
  }
  cancelOrder() {
    this.loading = true;
    this.oderservice.Cancele(+this.activeRoute.snapshot.paramMap.get('id'), this.userService.currentUser.id)
    .subscribe(res => {this.Data = res.Data; this.loading = false; });
  }
  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}, mealID) {
    this.myOrderParam = {MealID: mealID, UserID: this.userService.currentUser.id, rate: $event.newValue};
    this.mealsService.Rate(this.myOrderParam).subscribe(
       res => {
        if (res.Success) {
          this.toastr.success(res.Message);
         } else {
          this.toastr.error(res.Message);
        }
       }); }
  addToFavourite(mealID) {
    if (this.userService.currentUser == null) {
     this.toastr.error('please login before');
    } else if (this.userService.currentUser.type == 'chief') {
     this.toastr.error('chief cannot ordered');
    } else {
     this.myOrderParam = {MealID: mealID, UserID: this.userService.currentUser.id};
     this.mealsService.AddMealtoMyFavourite(this.myOrderParam).subscribe(
        res => {
         if (res.Success) {this.toastr.success(res.Message); this.getOrder(); } else {this.toastr.error(res.Message); }
        });
    }
  }

  showInvoice(ID) {
    this.localStorageService.set('Bill-recept' , (this.Data));
    const dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : window.screenX;
    const dualScreenTop = window.screenTop != undefined ? window.screenTop : window.screenY;

    const width  = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const left = ((width / 2) - (800 / 2)) + dualScreenLeft;
    const top  = ((height / 2) - (600 / 2)) + dualScreenTop;

    const href = '#/user/orders-bill-recept/' + ID;

    const thisWindow = window.open(href, 'random', `scrollbars=yes, width=800, height=600, top=${top}, left=${left}`);
    thisWindow.onload = () => {
            thisWindow.print();
            thisWindow.close();
          };


  }
}
