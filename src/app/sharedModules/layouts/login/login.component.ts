
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/services/user/contactus.service';
import { HttpClient } from '@angular/common/http';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { SignupComponent } from '../signup/signup.component';
import { UserService } from 'src/app/services/user/user.service';
import { SwPush } from '@angular/service-worker';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { ResetPasswordComponent } from 'src/app/modules/user/account/reset-password/reset-password.component';
import { ForgetPasswordComponent } from 'src/app/modules/user/account/forget-password/forget-password.component';
import { CartService } from 'src/app/services/user/cart.service';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  applicationServerPublicKey =
    'BIms4VYPR8d5xCn51cmE2XPFUB5-NSe4Mz9U0DoE3yAzB5qk1JnSzxgX4DiGB-eO5ht1tqfvFFVt7fCVy0TuXmA';
  swRegistration;
  form: FormGroup;
  myDataforcard: any = [];
  myOrderParam: any;
  loading = false;
  URLrouters: any[] = this.router.url.split('/');
  constructor(private formBuilder: FormBuilder,
              public  contactUsService: ContactUsService,
              private http: HttpClient,
              private toastr: ToastrService,
              public myModel: BsModalRef,
              private modalService: BsModalService,
              public userService: UserService,
              private cartService: CartService,
              private swPush: SwPush,
              private router: Router,
              public authService: AuthService,
              private localStorageService: LocalStorageService, ) { }

  ngOnInit() {
    this.initForm();
    this.form.reset();
  }
  initForm() {
    this.form = this.formBuilder.group({
      LoginField: [null, Validators.required],
      Password: [null, Validators.required],
    });
  }
  signUp() {
    this.modalService.show(SignupComponent, {
      class: 'modal-lg-width'});
  }
  signInWithFB() {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(res => {
      this.form.get('LoginField').setValue(res.email);
      this.loginwithSocial();
     });
    }
     signInWithGoogle(): void {
       this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(res => {
         this.form.get('LoginField').setValue(res.email);
         this.loginwithSocial();
       });
     }


  forgetPasswort() {
    this.myModel.hide();
    this.modalService.show(ForgetPasswordComponent);
  }
  addtomyCard() {
    debugger
    this.myDataforcard = this.localStorageService.get('mycart');
    if (this.localStorageService.get('mycart') == null ) {
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
          this.myDataforcard.forEach(element => {
          this.myOrderParam = {MealID: element.id, UserID: this.userService.currentUser.id, quantity: element.pivot.quantity};
          this.cartService.AddMenutoMyCart(this.myOrderParam).subscribe(res => {
            this.cartService.updateCard();
          });
          });
       
          return true;
        } else {
          return false;
        }
}
loginwithSocial() {
  this.userService.Login(this.form.value).subscribe(
    res => {
       if (res.Success) {
         this.localStorageService.set('accessToken', res.Data.token);
         this.localStorageService.set('currentUser', res.Data);
         this.myModel.hide();
         if (res.Data.type == 'customer') {
          this.addtomyCard();
          this.router.navigate(['/user/account/1']);
        } else {
         this.localStorageService.set('mycart', null);
         this.localStorageService.set('mycarttotal', null);
         this.router.navigate(['/chief/dashboard']);
        }
       } else {this.toastr.error(res.Message); }
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
    subscription.userID=this.userService.currentUser.id
    this.userService.subscribe(subscription).subscribe(res=>{});
  // return this.http
  //   .post('https://backend-qoot.qoot.online/api/subscribe', subscription)
  //   .toPromise()
  //   .catch(() => {
  //     console.log('failed to send subscription data to server');
  //   });
}
  login() {
    if (this.form.valid) {
      this.loading = true;
      this.userService.Login(this.form.value).subscribe(
       res => {
        this.loading = false;
        if (res.Success) {
           this.initializeUI();
            this.localStorageService.set('accessToken', res.Data.token);
            this.localStorageService.set('currentUser', res.Data);
            this.myModel.hide();
            if (res.Data.type == 'customer') {
             this.addtomyCard();
             this.router.navigate(['/user/account/1']);
           } else {
            this.localStorageService.set('mycart', null);
            this.localStorageService.set('mycarttotal', null);
            this.router.navigate(['/chief/dashboard']);
           }
          } else {this.toastr.error(res.Message); }
       });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}

