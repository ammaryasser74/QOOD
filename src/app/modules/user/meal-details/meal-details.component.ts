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
import { MealModalComponent } from './meal-modal/meal-modal.component';
import { BsModalService } from 'ngx-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-meal-details',
  templateUrl: './meal-details.component.html',
  styleUrls: ['./meal-details.component.css'],
})
export class MealDetailsComponent implements OnInit {
  Data: any;
  form: FormGroup;
  formComment: FormGroup;
  loading: boolean;
  myOrderParam: any;
  userID: any = null;
  repoUrl: any;
  imageUrl: any;
  URLrouters: any[] = this.router.url.split('/');
  slideConfig = {
    slidesToShow: 3,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 3500,
    dots: true,
    infinite: true,
    arrows: true,
    responsive: [
      { breakpoint: 1600, settings: { slidesToShow: 3, slidesToScroll: 3 } },
      { breakpoint: 1000, settings: { slidesToShow: 2, slidesToScroll: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };
  constructor(
    public mealsService: MealsService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public languageService: LanguageService,
    public cartService: CartService,
    private userService: UserService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public settingService: SettingService,
    private modalService: BsModalService
  ) {}

  ngOnInit() {
    this.repoUrl =
      'https://qoot-frontend.start-it.online/#/user/meal-details/' +
      this.activeRoute.snapshot.paramMap.get('id');
    this.imageUrl =
      'https://avatars2.githubusercontent.com/u/10674541?v=3&s=200';
    this.loading = true;
    this.initFormComment();
    if (this.userService.currentUser != null) {
      this.userID = this.userService.currentUser.id;
    }
    this.initForm();
    this.mealsService
      .MealDetails(+this.activeRoute.snapshot.paramMap.get('id'), this.userID)
      .subscribe(res => {
        res.Data.img1 = environment.api_imges + res.Data.img1;
        res.Data.img2 = environment.api_imges + res.Data.img2;
        res.Data.img3 = environment.api_imges + res.Data.img3;
        res.Data.dishes.map(i => (i.img1 = environment.api_imges + i.img1));
        this.Data = res.Data;
        this.loading = false;
      });
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
  openMealModal(data) {
    this.modalService.show(MealModalComponent, {
      class: 'min-modal',
      initialState: {
        myDatat: data,
      },
    });
  }
  addToFavourite(mealID) {
    if (this.userID == null) {
      this.toastr.error('please login before');
    } else if (this.userService.currentUser.type == 'chief') {
      this.toastr.error('chief cannot ordered');
    } else {
      this.myOrderParam = {
        MealID: mealID,
        UserID: this.userService.currentUser.id,
      };
      this.mealsService
        .AddMealtoMyFavourite(this.myOrderParam)
        .subscribe(res => {
          if (res.Success) {
            if (res.Data.filter(i => i.id == mealID).length > 0) {
              const myarr = res.Data.filter(i => i.id == mealID);
              if (this.Data.id == mealID) {
                this.Data.customers = myarr[0].customers;
              }
              this.Data.dishes
                .filter(i => i.id == mealID)
                .map(i => (i.customers = myarr[0].customers));
            } else {
              if (this.Data.id == mealID) {
                this.Data.customers = [];
              }
              this.Data.dishes
                .filter(i => i.id == mealID)
                .map(i => (i.customers = []));
            }
            this.toastr.success(res.Message);
          } else {
            this.toastr.error(res.Message);
          }
        });
    }
  }
  onRate(
    $event: {
      oldValue: number;
      newValue: number;
      starRating: StarRatingComponent;
    },
    mealID
  ) {
    if (this.userID == null) {
      this.toastr.error('please login before');
    } else if (this.userService.currentUser.type == 'chief') {
      this.toastr.error('chief cannot ordered');
    } else {
      this.myOrderParam = {
        MealID: mealID,
        UserID: this.userService.currentUser.id,
        rate: $event.newValue,
      };
      this.mealsService.Rate(this.myOrderParam).subscribe(res => {
        if (res.Success) {
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      });
    }
  }
}
