import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { BookMarkService } from 'src/app/services/user/bookmark.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import { StarRatingComponent } from 'ng-starrating';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { CityService } from 'src/app/services/user/city.service';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-kitchen',
  templateUrl: './kitchen.component.html',
  styleUrls: ['./kitchen.component.css']
})
export class KitchenComponent implements OnInit {
  userID: any = null;
  myOrderParam: any;
  cities: any;
  Data: any;
  myCover: any;
  kitchenID: number;
  loading = true;
  constructor(private bookMarkService: BookMarkService,
              private toastr: ToastrService,
              private userService: UserService,
              private kitchenService: KitchenService,
              private activeRoute: ActivatedRoute,
              public cityService: CityService,
              public languageService: LanguageService) { }

  ngOnInit() {
    this.loading = true;

    if (this.userService.currentUser != null) {
      this.userID = this.userService.currentUser.id;
    }
    this.kitchenService.GetBySlug(this.userID, this.activeRoute.snapshot.paramMap.get('id')).subscribe(
      res => {
        this.Data = res.Data;
        this.kitchenID = res.Data.id;
        if (res.Data.cover == null) {
          this.myCover = 'assets/img/cover/homepage.jpg';
        } else {
          this.myCover = res.Data.cover;
        }
        this.cityService.GetList().subscribe(res => {this.cities = res.Data;
                                                     this.loading = false;
        });
      });
  }
  onRate($event: {oldValue: number, newValue: number, starRating: StarRatingComponent}, ChiefID) {
    if (this.userID == null) {
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
addBookMark() {
  if (this.userID == null) {
    this.toastr.error('please login before');
   } else {
    this.myOrderParam = {ChiefID: this.kitchenID, UserID: this.userID};
    this.bookMarkService.Post(this.myOrderParam).subscribe(res => {if (res.Success) {
      this.toastr.success(res.Message); } else {
      this.toastr.error(res.Message);
    }});
  }}
}
