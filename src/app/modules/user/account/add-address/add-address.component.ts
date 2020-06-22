
import {  BsModalRef } from 'ngx-bootstrap';
import { Component, OnInit } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AddressService } from 'src/app/services/user/Address.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/services/user/user.service';
import { CityService } from 'src/app/services/user/city.service';
import { LanguageService } from 'src/app/services/language.service';
declare var google: any;
@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent implements OnInit {
  lat = 0;
  onClose: any;
  loading = false;
  lng = 0;
  ID: number;
  private geoCoder;
  cities: any;
  form: FormGroup;
  nick: any;
  isOther = false;
  constructor(
    public myModel: BsModalRef,
    private mapsAPILoader: MapsAPILoader,
    public userService: UserService,
    public cityService: CityService,
    public addressService: AddressService,
    public languageService: LanguageService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService, ) {
    this.mapsAPILoader.load().then(() => {
      this.geoCoder = new google.maps.Geocoder();
    }); }

  ngOnInit() {
    this.isOther = false;
    this.loading = true;
    this.initForm();
    if (this.ID > 0) {
     this.addressService.GetByID(this.ID, this.userService.currentUser.id).subscribe(res => {
      if (res.Data.nick_name != 'Home' && res.Data.nick_name != 'Work') {this.nick = 'Other'; this.isOther = true; } else {
          this.nick = res.Data.nick_name; }
      this.form.patchValue(res.Data);
       });
    } else {
   this.form.get('nick_name').setValue('Home');
   this.nick = 'Home';
   }
    this.cityService.GetList().subscribe(res => {this.cities = res.Data; this.loading = false; });
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;
    });
    this.setCurrentLocation();
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

  nickSelect(nickval) {
    this.nick = nickval;
    if (nickval == 'Other') {
      this.isOther = true;
    } else {
      this.isOther = false;
      this.form.get('nick_name').setValue(nickval);
    }

  }
  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ location: { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[2]) {
          this.form.get('area').setValue(results[2].formatted_address);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }
  initForm() {
    this.form = this.formBuilder.group({
      id: [0],
      address: [null],
    // area:[null,{ disabled: true }, Validators.required],
      area: [null, Validators.required],
      delivery_instructions: [null, Validators.required],
      nick_name: [null],
      Lat: [null],
      default_address: [1],
      Lng: [null],
      user_id: [null],
      city_id: [null],
    });
  }
  save() {
    this.form.value.user_id = this.userService.currentUser.id;

    if (this.form.valid) {
      if (this.ID > 0) {
        this.addressService.Update(this.form.value).subscribe(
          res => {
             if (res.Success) {this.toastr.success(res.Message); this.myModel.hide();
                               this.onClose(res); } else {this.toastr.error(res.Message); }});
      } else {
        this.addressService.Post(this.form.value).subscribe(
          res => {
             if (res.Success) {this.toastr.success(res.Message); this.myModel.hide();
                               this.onClose(res); } else {this.toastr.error(res.Message); }});
      }
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }

  placeMarker($event) {
    this.lat = ($event.coords.lat);
    this.lng = ($event.coords.lng);
    this.form.get('Lat').setValue($event.coords.lat);
    this.form.get('Lng').setValue($event.coords.lng);
    this.getAddress(this.lat, this.lng);
  }
}
