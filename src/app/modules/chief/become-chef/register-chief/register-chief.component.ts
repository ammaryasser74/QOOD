import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Validators, FormBuilder, FormGroup, ValidatorFn, FormControl } from '@angular/forms';
import { CityService } from 'src/app/services/user/city.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'angularx-social-login';
import { CartService } from 'src/app/services/user/cart.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { SettingService } from 'src/app/services/user/setting.service';
import { SwPush } from '@angular/service-worker';
@Component({
  selector: 'app-register-chief',
  templateUrl: './register-chief.component.html',
  styleUrls: ['./register-chief.component.css']
})
export class RegisterChiefComponent implements OnInit {
  applicationServerPublicKey =
  'BIms4VYPR8d5xCn51cmE2XPFUB5-NSe4Mz9U0DoE3yAzB5qk1JnSzxgX4DiGB-eO5ht1tqfvFFVt7fCVy0TuXmA';
swRegistration;
  first = true;
  form: FormGroup;
  cities: any;
  loading: boolean;
  Card = false;
  qootReference: any = [];
  subscribe = false;
  constructor(public myModel: BsModalRef,
              private formBuilder: FormBuilder,
              public cityService: CityService,
              private toastr: ToastrService ,
               private swPush: SwPush,
              public authService: AuthService,
              public userService: UserService,
              private settingService: SettingService,
              public router: Router,
              public languageService: LanguageService,
              private cartService: CartService,
              public localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.first = true;
    this.Card = false;
    this.loading = true;
    this.initForm();
    this.cityService.GetList().subscribe(res => {this.cities = res.Data;
    });
    this.settingService.QootReference().subscribe(
      resref => {
        this.qootReference = resref.Data;
      });
    this.loading = false;
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
  
  }
 
  initForm() {
    const EMAIL_REGEXP = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.form = this.formBuilder.group({
      ID: [0],
      city_id: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern('(05)[0-9]{8}')]],
      email:[null, [Validators.required, Validators.pattern(EMAIL_REGEXP), Validators.pattern(/^\S*$/)]],
      slug: [null, [Validators.required, Validators.pattern('^[a-zA-Z0-9$@$-^-_+]+$')]],
      password: [null, Validators.required],
      password_confirmation: [null, [Validators.required]],
      kitchen_owner_name: [null, Validators.required],
      kitchen_name: [null, Validators.required],
      qoot_reference_id: [null, Validators.required],
      maroof_number: [null, Validators.required],
      health_card: [null],
      health: [0],
      is_subscriptions: [0],
      years: [null],
      type: 'chief'
    });
  }
  swap() {
    if (this.first == true) {this.first = false; } else {this.first = true; }
  }
  haveHealthCard(type) {
    if (type == 0) {this.Card = false; this.form.get('health_card').setValue(null); } else {this.Card = true; }
  }
  getsubscribe(type) {
    if (type == 0) {this.subscribe = false; this.form.get('years').setValue(null); } else {this.subscribe = true; }
  }
  save() {
   
    if (this.form.valid) {
      this.form.get('Email').setValue(this.form.value.Email.toLowerCase())
      this.loading=true
      this.localStorageService.set('accessToken', null);
      this.localStorageService.set('currentUser', null);
      this.localStorageService.set('mycart', null);
      this.localStorageService.set('mycarttotal', null);
      this.userService.Post(this.form.value).subscribe(
       res => {
          if (res.Success) {
            this.loading=false
            this.toastr.success(res.Message);
            this.localStorageService.set('accessToken', res.Data.token);
            this.localStorageService.set('currentUser', res.Data);
            this.initializeUI();
            this.myModel.hide();
            this.router.navigate(['/chief/chef-account']).then( (e) => {if (e) {window.location.reload(); }});
          } else {this.toastr.error(res.Message); }
       });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
