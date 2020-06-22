import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { LanguageService } from 'src/app/services/language.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/services/chief/menu.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css'],
})
export class AddMenuComponent implements OnInit {
  allDish: any = [];
  isEdit: false;
  Data: any = [];
  Days: any = [];
  selectedDay: any = [];
  form: FormGroup;
  invalidquatity = false;
  loading = true;
  constructor(
    public myModel: BsModalRef,
    private userService: UserService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private menuService: MenuService,
    public languageService: LanguageService,
    private kitchenService: KitchenService
  ) {}

  ngOnInit() {
    this.getDishes();
    this.initForm();
    this.kitchenService.Days().subscribe(res => {
      this.Days = res.Data;
      if (this.isEdit) {
        this.loading = false;
        this.form
          .get('dishName')
          .setValue(
            LanguageService.prototype.getLanguageOrDefault() == 'ar'
              ? this.Data.ar_name
              : this.Data.en_name
          );
        this.form.patchValue(this.Data.pivot);
        this.form.get('price').setValue(this.Data.price);
      } else {
        this.loading = false;
      }
    });
  }

  getDishes() {
    this.loading = true;
    this.kitchenService
      .DishGetList(this.userService.currentUser.chief_id)
      .subscribe(res => {
        this.allDish = res.Data;
      });
  }

  changeDish(row) {
    if (row > 0) {
      this.form.get('day_ids').setValue(null);
      this.form.patchValue(this.allDish.find(i => i.id == row));
      this.form.get('dish_id').setValue(this.allDish.find(i => i.id == row).id);
      this.form
        .get('price')
        .setValue(this.allDish.find(i => i.id == row).price);
      if (this.allDish.find(i => i.id == row).days.length == 0) {
        this.Days = this.Days;
        this.Days.map(i => (i.enable = true));
      } else {
        this.Days.map(i => (i.enable = true));
        this.allDish
          .find(i => i.id == row)
          .days.forEach(element => {
            this.Days.find(i => i.id == element.id).enable = false;
          });
      }
    }
  }

  initForm() {
    this.form = this.formBuilder.group({
      dis_count_value: [0, [Validators.min(0)]],
      day_id: [null],
      dish_id: [0],
      dishName: [null],
      price: [null, { readonly: true }],
      day_ids: [null],
      chief_id: this.userService.currentUser.chief_id,
    });
  }
  calculate() {
    if (this.form.value.price - this.form.value.dis_count_value < 0) {
      this.invalidquatity = true;
    } else if (this.form.value.dis_count_value < 0) {
      this.invalidquatity = false;
    } else {
      this.invalidquatity = false;
    }
  }
  DaySelect(e, id) {
    if (id == 0) {
      this.toastr.error('select Dish before');
    } else if (e.target.checked == true && id != 0) {
      const dishDay = this.allDish.find(i => i.id == this.form.value.dish_id)
        .days;
      if (dishDay) {
        const myID = dishDay.find(i => i.id == id);
        if (myID) {
          this.toastr.error('Day already Exsist');
        } else {
          this.selectedDay.push(id);
          this.form.get('day_ids').setValue(this.selectedDay);
        }
      } else {
        this.selectedDay.push(id);
        this.form.get('day_ids').setValue(this.selectedDay);
      }
    } else {
      const index = this.selectedDay.indexOf(id);
      this.selectedDay.splice(index, 1);
      this.form.get('day_ids').setValue(this.selectedDay);
    }
  }

  save() {
    if (this.form.value.dish_id == 0) {
      this.toastr.error('you must select dish');
    } else if (!this.isEdit && this.form.value.day_ids == null) {
      this.toastr.error('you must at least select one day');
    } else if (this.form.valid) {
      if (!this.isEdit) {
        this.menuService.AddMenu(this.form.value).subscribe(res => {
          if (res.Success) {
            this.toastr.success(res.Message);
            this.myModel.hide();
          } else {
            this.toastr.error(res.Message);
          }
        });
      } else {
        this.menuService.UpdateMenu(this.form.value).subscribe(res => {
          if (res.Success) {
            this.toastr.success(res.Message);
            this.myModel.hide();
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
