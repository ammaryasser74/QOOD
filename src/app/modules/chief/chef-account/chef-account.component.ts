import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ResetPasswordComponent } from '../../user/account/reset-password/reset-password.component';
import { BsModalService } from 'ngx-bootstrap';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { CityService } from 'src/app/services/user/city.service';
import { LanguageService } from 'src/app/services/language.service';
import { WebApiService } from 'src/app/services/webApi.service';
import { FormControl, ValidatorFn } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
declare var google: any;
@Component({
  selector: 'app-chef-account',
  templateUrl: './chef-account.component.html',
  styleUrls: ['./chef-account.component.css']
})
export class ChefAccountComponent implements OnInit {
  myavatar: any;
  lat = 0;
  lng = 0;
  img: null;
  cities: any;
  private geoCoder;
  fileData = null;
  fileCover = null;
  form: FormGroup;
  loading = false;
  constructor(private userService: UserService,
              public localStorageService: LocalStorageService,
              public modalService: BsModalService,
              public webApiService: WebApiService,
              private mapsAPILoader: MapsAPILoader,
              private modelService: BsModalService,
              public languageService: LanguageService,
              private toastr: ToastrService,
              private http: HttpClient,
              public cityService: CityService,
              private kitchenService: KitchenService,
              private formBuilder: FormBuilder, ) {
                this.mapsAPILoader.load().then(() => {
                  this.geoCoder = new google.maps.Geocoder();
                }); }

  ngOnInit() {
  this.loading = true;
  this.initForm();
  this.cityService.GetList().subscribe(res => {this.cities = res.Data; });
  this.getuser();
  this.mapsAPILoader.load().then(() => {
    this.setCurrentLocation();
    this.geoCoder = new google.maps.Geocoder;
  });
  this.setCurrentLocation();
  }
  changePasswort() {
    this.modalService.show(ResetPasswordComponent);
  }
  update() {
     this.kitchenService.Updatechief(this.form.value).subscribe(
       res => {
          if (res.Success) {
          this.localStorageService.set('currentUser', res.Data);
          this.toastr.success(res.Message); this.form.patchValue(res.Data); } else {this.toastr.error(res.Message); }
       });

  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = event.target.files[0] as File;
      reader.onload = (event: any) => {
         this.myavatar = (event.target.result);
      };
    }
  }
  onSelectCover(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileCover = event.target.files[0] as File;
      reader.onload = (event: any) => {
         this.img = (event.target.result);
      };
    }
  }
  onSubmit() {
    if (this.fileData == null) {
      this.toastr.error('اختر صوره اولا');
    } else {
      const formData = new FormData();
      formData.append('avatar', this.fileData);
      formData.append('UserID', this.userService.currentUser.id);
      this.http.request(new HttpRequest('POST' , `${environment.api_url}/Kitchen/UploadImage`,
      formData, {reportProgress: true})).subscribe(
        event => {
          if (event.type == 3) {this.toastr.success('Image uploaded Sucessfully');
                                this.getuser();
        }
      });
    }
  }
  onSaveCover() {
    if (this.fileCover == null) {
      this.toastr.error('اختر صوره اولا');
    } else {
      const formData = new FormData();
      formData.append('cover', this.fileCover);
      formData.append('UserID', this.userService.currentUser.id);
      this.http.request(new HttpRequest('POST', `${environment.api_url}/Kitchen/UploadImage`,
      formData, {reportProgress: true})).subscribe(
        event => {
          if (event.type == 3) {this.toastr.success('Image uploaded Sucessfully');
                                this.getuser();
        }
      });
    }
  }
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        this.form.get('Lat').setValue(position.coords.latitude);
        this.form.get('Lng').setValue(position.coords.longitude);
        this.getAddress(this.lat, this.lng);
      });
    }
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[2]) {
          this.form.get('address').setValue(results[2].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  getuser() {
    this.userService.GetByID(this.userService.currentUser.id).subscribe(res => {
      this.localStorageService.set('currentUser', res.Data);
      this.myavatar = this.userService.currentUser.avatar;
      this.img = this.userService.currentUser.cover;
      this.loading = false;
      this.form.patchValue(res.Data);
    });
  }
  placeMarker($event) {
    this.lat = ($event.coords.lat);
    this.lng = ($event.coords.lng);
    this.form.get('Lat').setValue($event.coords.lat);
    this.form.get('Lng').setValue($event.coords.lng);
    this.getAddress(this.lat, this.lng);
  }
  initForm() {
    this.form = this.formBuilder.group({
      id: [null],
      city_id: [null, Validators.required],
      slug: [null, [Validators.required, Validators.pattern('^[a-z]*$')]],
      phone: [null, {readonly: true }],
      email: [null, {readonly: true }],
      password: [null, Validators.required],
      password_confirmation: [null, Validators.required],
      kitchen_owner_name: [null, Validators.required],
      kitchen_name: [null, Validators.required],
      qoot_reference_id: [null],
      instagram_page: [null],
      maroof_number: [null, Validators.required],
      health_card: [null],
      Lat: [null, Validators.required],
      Lng: [null, Validators.required],
      address: [null, Validators.required],
      info: [null],
      is_subscriptions: [0],
      years: [null],
      type: 'chief'
    });
  }
}
