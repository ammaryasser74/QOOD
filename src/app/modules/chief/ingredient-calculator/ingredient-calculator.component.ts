import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { LanguageService } from 'src/app/services/language.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MenuService } from 'src/app/services/chief/menu.service';
import { ToastrService } from 'ngx-toastr';
import { IngredientService } from 'src/app/services/chief/ingredient.service';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';

@Component({
  selector: 'app-ingredient-calculator',
  templateUrl: './ingredient-calculator.component.html',
  styleUrls: ['./ingredient-calculator.component.css']
})
export class IngredientCalculatorComponent implements OnInit {
loading = false;
allDish: any = [];
ingredient: any = [];
warningModel: BsModalRef;
myOrderParam: any;
form: FormGroup;
  constructor(
    private userService: UserService,
    private modalService: BsModalService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private menuService: MenuService,
    public languageService: LanguageService,
    private kitchenService: KitchenService,
    private ingredientService: IngredientService) { }

  ngOnInit() {
    this.initForm();
    this.getDishes();
  }
  getDishes() {
    this.loading = true;
    this.kitchenService.DishGetList(this.userService.currentUser.chief_id).subscribe(
      res => {
        this.loading = false;
        this.allDish = res.Data;
      });
  }

 GetGridient() {
   if (this.form.value.dish_id == null) {
    this.toastr.error('you must select dish');
   } else if (this.form.value.numberOfPortions == null) {
    this.toastr.error('you must select no of Portions');
   } else if (this.form.value.numberOfPortions == 0 || this.form.value.numberOfPortions < 0) {
    this.toastr.error('Portions must be greater than one');
   } else {
    this.ingredientService.GetList(this.form.value).subscribe(
    res => {
      this.ingredient = res.Data;
    });
  }

  }

  initForm() {
    this.form = this.formBuilder.group({
      dish_id: [null, Validators.required],
      numberOfPortions: [null, Validators.required],
      ingredientName: [null, Validators.required],
      quantityUsed: [null, [Validators.required, Validators.min(0)]],
      quantityPurchased: [null, [Validators.required, Validators.min(0)]],
      purchasePrice: [null, [Validators.required, Validators.min(0)]],
      unitPurchased: [null, Validators.required],
      unitUsed: [null, Validators.required],
      chief_id: this.userService.currentUser.chief_id
    });
  }
  save() {
  if (this.form.valid) {
    this.form.value.chief_id = this.userService.currentUser.chief_id;
    const DishId = this.form.value.dish_id;
    const numberOfPortions = this.form.value.numberOfPortions;
    this.ingredientService.Post(this.form.value).subscribe(
      res => {
        if (res.Success) {
          this.toastr.success(res.Message);
          this.form.reset;
          this.form.reset();
          this.form.get('dish_id').setValue(DishId);
          this.form.get('numberOfPortions').setValue(numberOfPortions);
          this.ingredient = res.Data;
        } else {this.toastr.error(res.Message); }
      });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
  Delete(ID) {

    this.warningModel = this.modalService.show(WarningComponent, { class: 'modal-sm' });
    this.warningModel.content.boxObj.msg = 'Are you sure you want to delete this  ?';
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.ingredientService.Delete(ID).subscribe(res => {
            if (res.Success) {
              this.toastr.success(res.Message);
              this.GetGridient();
              this.warningModel.hide(); } else {
              this.toastr.error(res.Message);
            }});
      }
    };
  }
}
