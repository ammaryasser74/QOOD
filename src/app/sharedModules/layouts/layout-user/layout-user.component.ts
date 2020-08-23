import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginComponent } from '../login/login.component';
import { StarRatingComponent } from 'ng-starrating';
import { BsModalService } from 'ngx-bootstrap';
import { SignupComponent } from '../signup/signup.component';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../../services/language.service';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from 'src/app/services/user/setting.service';
import { CusinesService } from 'src/app/services/user/cusines.service';
import { BrandService } from 'src/app/services/user/brand.service';
import { ToastrService } from 'ngx-toastr';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { CartService } from 'src/app/services/user/cart.service';
import { RatingModule } from 'ng-starrating';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { NotificationService } from 'src/app/services/chief/Notification.service';

declare var require: any;
@Component({
  selector: 'app-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.css'],
})
export class LayoutUserComponent implements OnInit {
  myUrl: any;
  imgLan: any;
  subLayoutEvent: Subscription;
  cusines: any;
  loadingdata: boolean;
  brands: any;
  Total = 0;
  myCart: any;
  mydir: any;
  settings;
  form: FormGroup;
  isLogin = false;
  isChief = false;
  nav = 1;
  footnav = 1;
  loading: any = false;
  aside = 1;
  myasideclass: any;
  isOpen = false;
  listNotification:[];
  constructor(
    private modalService: BsModalService,
    public languageService: LanguageService,
    public translateService: TranslateService,
    public notificationService:NotificationService,
    public settingService: SettingService,
    public cusinesService: CusinesService,
    public brandService: BrandService,
    private router: Router,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public userService: UserService,
    public cartService: CartService,
    public localStorageService: LocalStorageService
  ) {}
  ngOnInit() {
    this.GetListNotifiction();
    console.log(  this.localStorageService.get('first'),";;;");
    // this.localStorageService.set('first',true)
     if(this.localStorageService.get('first')==null){
      this.userService.checkmyToken();
      this.localStorageService.set('first',true)
      this.localStorageService.set('mycart', null);
      this.localStorageService.set('mycarttotal', null);
      this.localStorageService.set('accessToken',null);
      this.localStorageService.set('currentUser', null);
    }
    this.myUrl = environment.api_imges;
    this.aside = 1;
    this.isOpen = false;
    this.nav = 1;
    this.footnav = 1;
    if (!this.userService.currentUser) {
      this.isLogin = false;
      this.isChief = false;
    } else {
      this.isLogin = true;
      if (this.userService.currentUser.type == 'customer') {
        this.cartService.updateCard();
        this.isChief = false;
      } else {
        this.isChief = true;
      }
    }

    this.loadingdata = true;
    this.initForm();
    this.cusinesService.GetList().subscribe(res => {
      this.cusines = res.Data;
      this.settingService.GetList().subscribe(res => {
        this.settings = res.Data;
        this.brandService.GetList().subscribe(res => {
          this.brands = res.Data;
          this.loadingdata = false;
        });
      });
    });

    this.translateService.setDefaultLang(
      this.languageService.getLanguageOrDefault()
    );
    if (this.languageService.getLanguageOrDefault() === 'ar') {
      this.mydir = 'rtl';
      this.imgLan = 'assets/img/icons/sa.png';
      require('style-loader!src/assets/css/style-rtl.css');
    } else {
      this.mydir = 'ltr';
      this.imgLan = 'assets/img/icons/uk.svg';
      require('style-loader!src/assets/css/style.css');
    }
  }

  getFromLocalStorage(key: string) {
    return this.localStorageService.get(key) as any;
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: [null, Validators.required],
    });
  }
  login() {
    this.modalService.show(LoginComponent, {
      class: 'modal-lg-width',
    });
  }
  signUp() {
    this.modalService.show(SignupComponent, {
      class: 'modal-lg-width',
    });
  }
  logout() {
    this.userService.LogOut();
  }

  toggleMenu() {
    this.isOpen = !this.isOpen;
  }

  closeMenu() {
    this.isOpen = false;
  }
  GetListNotifiction(){
    if(this.userService.currentUser){
      setTimeout(() => {
        this.notificationService.GetList(this.userService.currentUser.id).subscribe(
          res=>{
            this.listNotification=res.Data.filter(i=>i.read==0)}
        )
      }, 200);
    }
  }
  readNotigication(id){
    this.notificationService.Read(id).subscribe(res=>{
      this.router.navigate(['/chief/orders'])
    })
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
}
