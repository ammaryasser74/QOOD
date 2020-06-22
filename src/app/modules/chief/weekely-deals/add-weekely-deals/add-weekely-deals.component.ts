import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { WeekelyDealsService } from 'src/app/services/chief/weekely-deals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
@Component({
  selector: 'app-add-weekely-deals',
  templateUrl: './add-weekely-deals.component.html',
  styleUrls: ['./add-weekely-deals.component.css']
})
export class AddWeekelyDealsComponent implements OnInit {
  loading = false;
  myUrl: any;
  addEditaddressModel: BsModalRef;
  allDish: any = [];
  Data: any = [];
  isEdit = false;
  form: FormGroup;
  myparam: any;
  onClose: any;
  img8: any;
  img1: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;
  img7: any;
  Days: any = [];
  fileData = null;
  fileData1 = null;
  fileData2 = null;
  fileData3 = null;
  fileData4 = null;
  fileData5 = null;
  fileData6 = null;
  fileData7 = null;
  Dish_Day: any = [];
  myOpenDay: number;
  open = false;
  constructor( public myModel: BsModalRef,
               public kitchenService: KitchenService,
               private weekelyDealsService: WeekelyDealsService,
               private formBuilder: FormBuilder,
               public languageService: LanguageService,
               public modalService: BsModalService,
               private http: HttpClient,
               private toastr: ToastrService,
               public userService: UserService) { }

  ngOnInit() {
    this.myUrl = environment.api_imges;
    this.open = false;
    this.getDishes();
    this.initForm();
    this.kitchenService.Days().subscribe(res => {
      this.Days = res.Data;
    });
    if (this.Data != null) {
      this.isEdit = true;
      this.form.patchValue(this.Data);
      this.img8 = this.myUrl + this.Data.img;
      this.Data.dishes.forEach(element => {
      this.myparam = {dish_id: element.id, day_id: element.pivot.day_id};
      this.Dish_Day.push(this.myparam);
     });
      this.Data.days.forEach(element => {
       if (element.id == 1) {this.img1 = this.myUrl + element.pivot.path; } else if (element.id == 2) {this.img2 = this.myUrl + element.pivot.path; } else if (element.id == 3) {this.img3 = this.myUrl + element.pivot.path; } else if (element.id == 4) {this.img4 = this.myUrl + element.pivot.path; } else if (element.id == 5) {this.img5 = this.myUrl + element.pivot.path; } else if (element.id == 6) {this.img6 = this.myUrl + element.pivot.path; } else {this.img7 = this.myUrl + element.pivot.path; }
     });
    }
  }
  getDishes() {
    this.loading = true;
    this.kitchenService.DishGetList(this.userService.currentUser.chief_id).subscribe(
      res => {
        this.loading = false;
        this.allDish = res.Data;

      });
  }
  onSelectFile(event, DayID) {
    if (DayID == 8) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData = event.target.files[0] as File;
        reader.onload = (event: any) => {
            this.img8 = (event.target.result);
            this.uploadmyImages(this.fileData, 8);
        };
      }
    }
    if (DayID == 1) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData1 = event.target.files[0] as File;
        reader.onload = (event: any) => {
            this.img1 = (event.target.result);
            this.uploadmyImages(this.fileData1, 1);
        };
      }
    }
    if (DayID == 2) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData2 = event.target.files[0] as File;
        reader.onload = (event: any) => {
            this.img2 = (event.target.result);
            this.uploadmyImages(this.fileData2, 2);
        };
      }
    }
    if (DayID == 3) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData3 = event.target.files[0] as File;
        reader.onload = (event: any) => {
            this.img3 = (event.target.result);
            this.uploadmyImages(this.fileData3, 3);
        };
      }
    }
    if (DayID == 4) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData4 = event.target.files[0] as File;
        reader.onload = (event: any) => {
            this.img4 = (event.target.result);
            this.uploadmyImages(this.fileData4, 4);
        };
      }
    }
    if (DayID == 5) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData5 = event.target.files[0] as File;
        reader.onload = (event: any) => {
            this.img5 = (event.target.result);
            this.uploadmyImages(this.fileData5, 5);
        };
      }
    }
    if (DayID == 6) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData6 = event.target.files[0] as File;
        reader.onload = (event: any) => {
            this.img6 = (event.target.result);
            this.uploadmyImages(this.fileData6, 6);
        };
      }
    }
    if (DayID == 7) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData7 = event.target.files[0] as File;
        reader.onload = (event: any) => {
            this.img7 = (event.target.result);
            this.uploadmyImages(this.fileData7, 7);
        };
      }
    }
  }
  initForm() {
    this.form = this.formBuilder.group({
      ar_description: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      ar_name: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      en_description: [null, [Validators.required, Validators.pattern('^[0-9A-Za-z ]+$')]],
      subscription_type: [7],
      en_name: [null, [Validators.required, Validators.pattern('^[0-9A-Za-z ]+$')]],
      no_persons: [null, [Validators.required, Validators.min(0)]],
      price: [null, [Validators.required, Validators.min(0)]],
      days: [null],
      chief_id: this.userService.currentUser.chief_id,
      id: [0, Validators.required],
      img8: [null],
      img1: [null],
      img2: [null],
      img3: [null],
      img4: [null],
      img5: [null],
      img6: [null],
      img7: [null],
    });
  }
  addDishToDay(DishID) {
    if (this.myOpenDay > 0) {
      this.myparam = {dish_id: DishID, day_id: this.myOpenDay};
      if (this.Dish_Day.length == 0) {
        this.Dish_Day.push(this.myparam);
      } else if (this.Dish_Day.find(i => i.dish_id == DishID && i.day_id == this.myOpenDay)) {
      for (let index = 0; index < this.Dish_Day.length; index++) {
        if (this.Dish_Day[index].dish_id == DishID && this.Dish_Day[index].day_id == this.myOpenDay) {
          this.Dish_Day.splice(index, 1);
        }
      }
       } else {
        this.Dish_Day.push(this.myparam);
      }
    }

  }
  back() {
    this.open = false;
    this.myOpenDay = 0;
  }
  openMeal(row) {
    this.myOpenDay = row;
    this.open = true;
    if (row > 0 && this.Dish_Day.length > 0) {
      if (this.Dish_Day.filter(i => i.day_id == row).length == 0) {
        this.allDish = this.allDish;
        this.allDish.map(i => i.checked = false);
      } else {
        this.allDish.map(i => i.checked = false);
        const myDishEsit = this.Dish_Day.filter(i => i.day_id == row);
        myDishEsit.forEach(element => {
          this.allDish.find(i => i.id == element.dish_id).checked = true;
        });
      }
    }
  }
  uploadmyImages(Data, type) {
    const formData = new FormData();
    formData.append('img', Data);
    this.http.request(new HttpRequest('POST', `${environment.api_url}/UploadImage`,
    formData, { reportProgress: true })).subscribe(
      event => {

        if (event.type === HttpEventType.Response) {
          console;
          if (event.body['Success']) {
            if (type == 1) {
              console.log(type, 1);
              this.form.get('img1').setValue(event.body['Data'].image);
            } else if (type == 2) {
              console.log(type, 2);
              this.form.get('img2').setValue(event.body['Data'].image);
            } else if (type == 3) {
            console.log(type, 3);
            this.form.get('img3').setValue(event.body['Data'].image);
          } else if (type == 4) {
            console.log(type, 4);
            this.form.get('img4').setValue(event.body['Data'].image);
          } else if (type == 5) {
            console.log(type, 5);
            this.form.get('img5').setValue(event.body['Data'].image);
          } else if (type == 6) {
              console.log(type, 6);
              this.form.get('img6').setValue(event.body['Data'].image);
            } else if (type == 7) {
            console.log(type, 7);
            this.form.get('img7').setValue(event.body['Data'].image);
          } else if (type == 8) {
            console.log(type, 8);
            this.form.get('img8').setValue(event.body['Data'].image);
          } else {
            this.toastr.error('something wrong upload again');
          }
        }
      }
      },
    );
    // const formData = new FormData();
    // formData.append('img1',this.fileData1);
    // formData.append('img2',this.fileData2);
    // formData.append('img3',this.fileData3);
    // formData.append('img4',this.fileData4);
    // formData.append('img5',this.fileData5);
    // formData.append('img6',this.fileData6);
    // formData.append('img7',this.fileData7);
    // formData.append('img8',this.fileData);
    // formData.append('id',Data.id);



  }
  save() {
    if (this.Dish_Day.length == 0) {
      this.toastr.error('you must at least one day');
    } else if (this.form.valid) {
      this.form.value.days = this.Dish_Day;
      if (this.form.value.id == 0) {
      this.loading = true;
      this.weekelyDealsService.Post(this.form.value).subscribe(
        res => {
          if (res.Success) {
          this.myModel.hide();
          this.onClose();
          this.toastr.success(res.Message);
          } else {this.toastr.error(res.Message); }
        }
      );
    } else {
      this.loading = true;
      this.weekelyDealsService.update(this.form.value).subscribe(
        res => {
          if (res.Success) {
          this.myModel.hide();
          this.onClose();
          this.toastr.success(res.Message);
          } else {this.toastr.error(res.Message); }
        }
      );
    }
  } else {
    for (const control in this.form.controls) {
      this.form.get(control).markAsDirty();
    }
  }
  }

}
