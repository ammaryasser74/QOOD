import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { AuthService } from 'angularx-social-login';
import {
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/user/cart.service';
import { VerficationCodeComponent } from '../verfication-code/verfication-code.component';
import { SwPush } from '@angular/service-worker';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  applicationServerPublicKey =
    'BIms4VYPR8d5xCn51cmE2XPFUB5-NSe4Mz9U0DoE3yAzB5qk1JnSzxgX4DiGB-eO5ht1tqfvFFVt7fCVy0TuXmA';
  swRegistration;
  form: FormGroup;
  myDataforcard: any = [];
  CodeVerify: number;
  myOrderParam: any;
  addEditaddressModel: BsModalRef;
  constructor(
    private formBuilder: FormBuilder,
    private swPush: SwPush,
    public userService: UserService,
    public modalService: BsModalService,
    private toastr: ToastrService,
    public myModel: BsModalRef,
    public authService: AuthService,
    public router: Router,
    private cartService: CartService,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      ID: [0],
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern('(05)[0-9]{8}')]],
      email: [null, Validators.required],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],
      agree: [false, Validators.required],
      type: 'customer',
    });
  }
  initializeUI() {
    this.swPush.subscription.pipe(take(1)).subscribe(subscription => {
      console.log({ subscription });
      const isSubscribed = !(subscription === null);

      if (isSubscribed) {
        console.log('User IS subscribed.');
        this.updateSubscriptionOnServer(subscription);
      } else {
        console.log('User is NOT subscribed.');
        this.subscribeUser();
      }
    });
  }

  subscribeUser() {
    this.swPush
      .requestSubscription({
        serverPublicKey: this.applicationServerPublicKey,
      })
      .then(subscription => {
        console.log('User is subscribed.');
        console.log(subscription);
        this.updateSubscriptionOnServer(subscription);
      })
      .catch(err => {
        console.log('Failed to subscribe the user: ', err);
      });
  }
  updateSubscriptionOnServer(subscription) {
    subscription.userID = this.userService.currentUser.id;
    this.userService.subscribe(subscription).subscribe(() => {});
    // return this.http
    //   .post('https://backend-qoot.qoot.online/api/subscribe', subscription)
    //   .toPromise()
    //   .catch(() => {
    //     console.log('failed to send subscription data to server');
    //   });
  }
  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.form.get('firstname').setValue(res.firstName);
      this.form.get('lastname').setValue(res.lastName);
      this.form.get('email').setValue(res.email);
    });
  }
  addtomyCard() {
    this.myDataforcard = this.localStorageService.get('mycart');
    if (this.localStorageService.get('mycart') == null) {
      this.localStorageService.set('mycart', null);
      this.localStorageService.set('mycarttotal', null);
      this.myDataforcard = [];
      return false;
    }
    if (this.myDataforcard.length == 0) {
      this.localStorageService.set('mycart', null);
      this.localStorageService.set('mycarttotal', null);
      return false;
    }
    if (this.localStorageService.get('mycart') != null) {
      this.myDataforcard.dishes.forEach(element => {
        this.myOrderParam = {
          MealID: element.id,
          UserID: this.userService.currentUser.id,
          quantity: element.pivot.quantity,
        };
        this.cartService.AddDishtoMyCart(this.myOrderParam).subscribe(res => {
          this.cartService.updateCard();
        });
      });
      this.myDataforcard.weeklydeals.forEach(element => {
        this.myOrderParam = {
          WeeklyDealID: element.id,
          UserID: this.userService.currentUser.id,
          quantity: element.pivot.quantity,
        };
        this.cartService
          .addWeeklyDealtoMyCart(this.myOrderParam)
          .subscribe(res => {
            this.cartService.updateCard();
          });
      });
      return true;
    } else {
      return false;
    }
  }
  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
      this.form.get('firstname').setValue(res.firstName);
      this.form.get('lastname').setValue(res.lastName);
      this.form.get('email').setValue(res.email);
    });
  }

  save() {
    if (this.form.valid) {
      this.userService.Post(this.form.value).subscribe(res => {
        if (res.Success) {
          this.toastr.success(res.Message);
          this.localStorageService.set('accessToken', res.Data.token);
          this.localStorageService.set('currentUser', res.Data);
          this.initializeUI();
          this.myModel.hide();
          if (res.Data.type == 'customer') {
            const asd = this.addtomyCard();
            if (asd == true) {
              this.router.navigate(['/user/shopping']);
            } else {
              this.router.navigate(['/user/account/1']);
            }
          } else {
            this.router.navigate(['/chief/chef-account']).then(e => {
              if (e) {
                window.location.reload();
              }
            });
          }
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
}
