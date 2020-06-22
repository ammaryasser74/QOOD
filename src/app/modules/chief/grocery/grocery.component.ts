
import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/services/chief/dish.service';
import { UserService } from 'src/app/services/user/user.service';

import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { LanguageService } from 'src/app/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { environment } from 'src/environments/environment';
import { AddGroceryComponent } from './add-grocery/add-grocery.component';

@Component({
  selector: 'app-grocery',
  templateUrl: './grocery.component.html',
  styleUrls: ['./grocery.component.css']
})
export class GroceryComponent implements OnInit {
  dishes: any = [];
  myUrl: any;
  appprove: any;
  loading = false;
  addEditaddressModel: BsModalRef;
  warningModel: BsModalRef;
  constructor(private dishService: DishService,
              private userService: UserService,
              private kitchenService: KitchenService,
              public modalService: BsModalService,
              public languageService: LanguageService,
              private toastr: ToastrService,
              private modelService: BsModalService, ) { }
  ngOnInit() {
  this.myUrl = environment.api_imges;
  this.getDishes();
  }
  getDishes() {
    this.loading = true;
    this.kitchenService.DishGetList(this.userService.currentUser.chief_id).subscribe(
      res => {
        this.loading = false;
        this.dishes = res.Data;
      }
    );
  }
  deleteDish(DishID) {
    this.warningModel = this.modelService.show(WarningComponent, { class: 'modal-sm' });
    this.warningModel.content.boxObj.msg = 'Are you sure you want to delete this Dish ?';
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.kitchenService.DeleteDish(DishID).subscribe(res => {
            if (res.Success) {
              this.dishes = res.Data;
              this.toastr.success(res.Message);
              this.warningModel.hide(); } else {
              this.toastr.error(res.Message);
            }});
      }
    };
  }
  addDish(row) {
    this.addEditaddressModel = this.modalService.show(AddGroceryComponent, { initialState:
    {Data: row, }, class: 'modal-sm' });
    this.addEditaddressModel.content.onClose  = (res) => {
    this.getDishes();
    };
  }
}
