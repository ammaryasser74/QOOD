import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { CategoryService } from 'src/app/services/user/categories.service';
import { LanguageService } from 'src/app/services/language.service';
import { CusinesService } from 'src/app/services/user/cusines.service';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import {
  HttpRequest,
  HttpClient,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { DishService } from 'src/app/services/chief/dish.service';
import { BsModalRef } from 'ngx-bootstrap';
import { UnitService } from 'src/app/services/chief/unit.service';

@Component({
  selector: 'app-add-dish',
  templateUrl: './add-dish.component.html',
  styleUrls: ['./add-dish.component.css'],
})
export class AddDishComponent implements OnInit {
  selected = [];
  Days = [];
  isEdit = false;
  onClose: any;
  fileData = null;
  fileData2 = null;
  fileData3 = null;
  Data: any;
  loading = false;
  categories: any;
  Dayselect: any = [];
  myimages = [];
  cusines: any;
  img1: any = null;
  img2: any = null;
  img3: any = null;
  units:any;
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    public myModel: BsModalRef,
    public unitService:UnitService,
    private categoryService: CategoryService,
    public languageService: LanguageService,
    private cusinesService: CusinesService,
    private kitchenService: KitchenService,
    private dishService: DishService,
    public userService: UserService,
    private toastr: ToastrService,
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.categoryService.GetList().subscribe(res => {
      this.categories = res.Data;
    });
    this.initForm();
    if (this.Data != null) {
      this.isEdit = true;
      this.Data.category_id=this.Data.category.id
      this.form.patchValue(this.Data);

      // this.Data.cusines.forEach(element => {
      //   this.selected.push(element.id);
      // });
      // this.Data.days.forEach(element => {
      //   this.Days.push(element.id);
      // });
    
      this.form.get('dish_id').setValue(this.Data.id);
      this.img1 =
        this.Data.img1 != null ? environment.api_imges + this.Data.img1 : null;
      this.img2 =
        this.Data.img2 != null ? environment.api_imges + this.Data.img2 : null;
      this.img3 =
        this.Data.img3 != null ? environment.api_imges + this.Data.img3 : null;
    }

    // this.form.get('day_ids').setValue(this.Days)
    // this.form.get('cusines_ids').setValue(this.selected);
   
    this.unitService.GetList().subscribe(res=>{this.units=res});
  
    this.kitchenService.Days().subscribe(res => {
      this.Days = res.Data;
    });
  }

  initForm() {
    this.form = this.formBuilder.group({
      // day_ids:[null, Validators.required],
      images: [],
      dish_id: [],
      media: [],
      ar_name: [
        null,
        [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')],
      ],
      en_name: [
        null,
        [Validators.required],
      ],
      en_description: [
        null,
        [Validators.required],
      ],
      ar_description: [
        null,
        [Validators.required],
      ],
  
      chief_id: this.userService.currentUser.chief_id,
      quantity: [null, [Validators.required, Validators.min(0.1)]],
      price: [10],
    
      category_id: [null, Validators.required],
      // cusines_ids: [null, Validators.required],
      unit_id: [null, Validators.required],
      img1: [null],
      img2: [null],
      img3: [null],
    });
  }
  onSelectFile(event, type) {
    if (type == 1) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData = event.target.files[0] as File;
        this.myimages.push(this.fileData);
        reader.onload = (event: any) => {
          this.img1 = event.target.result;
          this.uploadmyImage(this.fileData, 1);
        };
      }
    } else if (type == 2) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData2 = event.target.files[0] as File;
        this.myimages.push(this.fileData);
        reader.onload = (event: any) => {
          this.img2 = event.target.result;
          this.uploadmyImage(this.fileData2, 2);
        };
      }
    } else {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData3 = event.target.files[0] as File;
        this.myimages.push(this.fileData);
        reader.onload = (event: any) => {
          this.img3 = event.target.result;
          this.uploadmyImage(this.fileData3, 3);
        };
      }
    }
  }

  uploadmyImage(Data, type) {
    const formData = new FormData();
    formData.append('img', Data);
    this.http
      .request(
        new HttpRequest(
          'POST',
          `${environment.api_url}/UploadImage`,
          formData,
          { reportProgress: true }
        )
      )
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          if (event.body['Success']) {
            if (type == 1) {
              this.form.get('img1').setValue(event.body['Data'].image);
            } else if (type == 2) {
              this.form.get('img2').setValue(event.body['Data'].image);
            } else {
              this.form.get('img3').setValue(event.body['Data'].image);
            }
          } else {
            this.toastr.error('something wrong upload again');
          }
        }
      });
  }
  save() {
    if (
      this.fileData == null &&
      this.fileData2 == null &&
      this.fileData3 == null &&
      this.img1 == null
    ) {
      this.toastr.error('you must al least one image');
    } else if (this.form.valid) {
      if (this.form.value.dish_id > 0) {
        this.loading = true;
        this.kitchenService.updateDish(this.form.value).subscribe(res => {
          if (res.Success) {
            this.toastr.success(res.Message);
            this.myModel.hide();
            this.onClose();
          } else {
            this.toastr.error(res.Message);
          }
        });
      } else {
        this.loading = true;
        this.kitchenService.addDish(this.form.value).subscribe(res => {
          if (res.Success) {
            this.toastr.success(res.Message);
            this.myModel.hide();
            this.onClose();
          } else {
            this.toastr.error(res.Message);
          }
        });
      }
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
