import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/user/event.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CategoryService } from 'src/app/services/user/categories.service';
import { LanguageService } from 'src/app/services/language.service';
import { CityService } from 'src/app/services/user/city.service';
import { BsModalRef } from 'ngx-bootstrap';
import * as moment from 'moment-timezone';
import { Time } from '@angular/common';

@Component({
  selector: 'app-request-event',
  templateUrl: './request-event.component.html',
  styleUrls: ['./request-event.component.css']
})
export class RequestEventComponent implements OnInit {
  timepickerVisible = true;
  mytime: Time;
  form: FormGroup;
  categories: any;
  cities: any;
loading = false;
  constructor(private formBuilder: FormBuilder,
              public  eventService: EventService,
              private toastr: ToastrService,
              public categoryService: CategoryService,
              public languageService: LanguageService,
              public cityService: CityService,
              public myModel: BsModalRef, ) { }

  ngOnInit() {
    this.loading = true;
    this.categoryService.GetList().subscribe(res => {this.categories = res.Data;
    });
    this.cityService.GetList().subscribe(res => {this.cities = res.Data; });
    this.loading = false;
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      address: [null, Validators.required],
      no_person: [null, Validators.required],
      budget: [null, Validators.required],
      city_id: [null, Validators.required],
      category_ids: [null, Validators.required],
      date: [new Date(), Validators.required],
      time: [moment(new Date()).format('hh:mm:ss'), Validators.required], // [null, Validators.required],
      Notes: [null],
    });
  }
  public changed(): void {
    this.mytime = moment(this.form.value.time).format('hh:mm:ss');
  }
  save() {
    this.form.value.date = moment(this.form.value.date).format('YYYY-MM-DD');
    this.form.value.time = moment(this.form.value.time).format('hh:mm:ss');
    if (moment(this.form.value.date).format('YYYY-MM-DD') < moment(new Date()).format('YYYY-MM-DD') ) {
      this.toastr.error('you cannot select Past Date');
    } else if (this.form.valid) {
     this.eventService.Post(this.form.value).subscribe(
       res => {
          if (res.Success) {this.toastr.success(res.Message); this.myModel.hide(); } else {this.toastr.error(res.Message); }
       });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
