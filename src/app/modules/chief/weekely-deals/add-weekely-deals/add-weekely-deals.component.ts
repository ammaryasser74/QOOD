import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { KitchenService ,Filter} from 'src/app/services/chief/kitchen.service';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { WeekelyDealsService } from 'src/app/services/chief/weekely-deals';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { HttpRequest, HttpClient, HttpEventType, HttpResponse } from '@angular/common/http';
import { CusinesService } from 'src/app/services/user/cusines.service';
import { CategoryService } from 'src/app/services/user/categories.service';
import { MenuService } from 'src/app/services/user/menu.service';
@Component({
  selector: 'app-add-weekely-deals',
  templateUrl: './add-weekely-deals.component.html',
  styleUrls: ['./add-weekely-deals.component.css']
})
export class AddWeekelyDealsComponent implements OnInit {
  filter: Filter = {  ChiefID: this.userService.currentUser.chief_id, SearchField:'',per_page:10,current_page: 1};
  loading = false;
  myUrl: any;
  addEditaddressModel: BsModalRef;
  allDish: any = [];
  Data: any = [];
  isEdit = false;
  form: FormGroup;
  myparam: any;
  onClose: any;
  cusines: any;
  img: any;
  img2: any;
  img3: any;
  img4: any;
  img5: any;
  img6: any;
  img7: any;
  Days: any = [];
  fileData = null;
  categories : any;
  fileData2 = null;
  fileData3 = null;
  fileData4 = null;
  fileData5 = null;
  fileData6 = null;
  fileData7 = null;
  Dish_Category: any = [];
  myOpenDay: number;
DishByCategory:any = [];
  open = false;
  constructor(public myModel: BsModalRef,
    public kitchenService: KitchenService,
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private cusinesService: CusinesService,
    public languageService: LanguageService,
    public modalService: BsModalService,
    private http: HttpClient,
    private toastr: ToastrService,
    public userService: UserService) { }

  ngOnInit() {
    this.myUrl = environment.api_imges;
    this.open = false;
    this.getDishes();
    this.cusinesService.GetList().subscribe(res => {
      this.cusines = res.Data;
    });
    this.categoryService.GetList().subscribe(res => {
      this.categories = res.Data;
    });
    this.initForm();
    this.kitchenService.Days().subscribe(res => {
      this.Days = res.Data;
    });
    if (this.Data != null) {
      this.isEdit = true;
      this.form.patchValue(this.Data);
      this.img = this.myUrl + this.Data.img;
      this.Data.dishes.forEach(element => {
        this.myparam = { dish_id: element.id, day_id: element.pivot.day_id };
        this.Dish_Category.push(this.myparam);
      });
      //   this.Data.days.forEach(element => {
      //    if (element.id == 1) {this.img1 = this.myUrl + element.pivot.path; } else if (element.id == 2) {this.img2 = this.myUrl + element.pivot.path; } else if (element.id == 3) {this.img3 = this.myUrl + element.pivot.path; } else if (element.id == 4) {this.img4 = this.myUrl + element.pivot.path; } else if (element.id == 5) {this.img5 = this.myUrl + element.pivot.path; } else if (element.id == 6) {this.img6 = this.myUrl + element.pivot.path; } else {this.img7 = this.myUrl + element.pivot.path; }
      //  });
    }
  }
  getDishes() {
    this.loading = true;
    this.kitchenService.GetListpaging(this.filter).subscribe(
      res => {
        this.loading = false;
        this.allDish= res.Data;
      }
    );
  }
  onSelectFile(event, DayID) {
    if (DayID == 8) {
      if (event.target.files && event.target.files[0]) {
        const reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]); // read file as data url
        this.fileData = event.target.files[0] as File;
        reader.onload = (event: any) => {
          this.img = (event.target.result);
          this.uploadmyImages(this.fileData, 8);
        };
      }
    }

  }
  initForm() {
    this.form = this.formBuilder.group({
      ar_description: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      ar_name: [null, [Validators.required, Validators.pattern('^[\u0621-\u064A0-9 ]+$')]],
      en_description: [null, [Validators.required, Validators.pattern('^[0-9A-Za-z ]+$')]],
      en_name: [null, [Validators.required, Validators.pattern('^[0-9A-Za-z ]+$')]],
      max_no_persons: [null, [Validators.required, Validators.min(0)]],
      min_no_persons: [null, [Validators.required, Validators.min(0)]],
      price_of_person: [null, [Validators.required, Validators.min(0)]],
      dishes_ids: [null],
      cusines_ids: [null],
      chief_id: this.userService.currentUser.chief_id,
      id: [0, Validators.required],
      img: [null],
    });
  }
  addDishToDay(DishID) {
  if(this.Dish_Category.length == 0){
    this.Dish_Category.push(DishID);
  }
  else{
      let index=this.Dish_Category.findIndex(i => i== DishID)
      console.log(index,"index");
      
          if(index!=-1){
            console.log(index,"KKKK");
            
            this.Dish_Category.splice(index, 1);
          }
          else{
            this.Dish_Category.push(DishID);
          }
  }
     
     
  
  


      // if (this.Dish_Category.length == 0) {
      //   this.Dish_Category.push(this.myparam);
      // } else if (this.Dish_Category.find(i => i.dish_id == DishID && i.day_id == this.myOpenDay)) {
      //   for (let index = 0; index < this.Dish_Category.length; index++) {
      //     if (this.Dish_Category[index].dish_id == DishID && this.Dish_Category[index].day_id == this.myOpenDay) {
      //       this.Dish_Category.splice(index, 1);
      //     }
      //   }
      // } else {
        
        console.log(this.form.value.dishes_ids ,this.Dish_Category,"ffff");
      
      // }
  

  }
  back() {
    this.open = false;
    this.myOpenDay = 0;
  }
  openMeal(catID) {
    console.log(this.allDish,"ASD");
    this.open = true;
    
    if (catID > 0 ) {

      if (this.Dish_Category.filter(i => i.category_id == catID).length == 0) {  
        this.DishByCategory=this.allDish.data
        this.DishByCategory.filter(i => i.category_id === catID);
console.log("lllllllllllllllllllllll");

        // this.allDish.data.map(i => i.checked = false);
      } else {
        console.log("llllllllllll");
        
        this.allDish.map(i => i.checked = false);
        const myDishEsit = this.Dish_Category.filter(i => i.category_id == catID);
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

              this.form.get('img').setValue(event.body['Data'].image);

            }
          }
        },
      );

  }
  save() {
    if (this.Dish_Category.length == 0) {
      this.toastr.error('you must at least one day');
    } else if (this.form.valid) {
      this.form.value.dishes_ids = this.Dish_Category;
      if (this.form.value.id == 0) {
        console.log(this.form.value.dishes_ids ,this.Dish_Category,"ffff");
        
        this.loading = true;
        this.menuService.Post(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.myModel.hide();
              this.onClose();
              this.toastr.success(res.Message);
            } else { this.toastr.error(res.Message); }
          }
        );
      } else {
        this.loading = true;
        this.menuService.Update(this.form.value).subscribe(
          res => {
            if (res.Success) {
              this.myModel.hide();
              this.onClose();
              this.toastr.success(res.Message);
            } else { this.toastr.error(res.Message); }
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
