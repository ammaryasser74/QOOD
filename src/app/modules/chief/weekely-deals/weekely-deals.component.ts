import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { DishService } from 'src/app/services/chief/dish.service';
import { UserService } from 'src/app/services/user/user.service';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { LanguageService } from 'src/app/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { AddWeekelyDealsComponent } from './add-weekely-deals/add-weekely-deals.component';
import { WeekelyDealsService } from 'src/app/services/chief/weekely-deals';
import { environment } from 'src/environments/environment';
import { MenuService,MealFilter } from 'src/app/services/user/menu.service';
@Component({
  selector: 'app-weekely-deals',
  templateUrl: './weekely-deals.component.html',
  styleUrls: ['./weekely-deals.component.css']
})
export class WeekelyDealsComponent implements OnInit {
  filter: MealFilter = {min_price: 1,KitchenID:this.userService.currentUser.chief_id, max_price: 2000, UserID: null, city_id: 0, category_id: 0, filterType: 0, cusines_id: []};
  dishes: any = [];
  myUrl: any;
  Data: any = [];
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
              private menuService: MenuService,
              private weekelyDealsService: WeekelyDealsService,
              private modelService: BsModalService, ) { }

  ngOnInit() {
    console.log(this.userService.currentUser);
    
    this.myUrl = environment.api_imges;
    this.loading = true;
    this.userService.GetByID(this.userService.currentUser.id).subscribe(res => {this.appprove = res.Data.is_approved; });
    this.GetWeekelyDeals();

  }
  GetWeekelyDeals() {
    this.menuService.Filter(this.filter).subscribe(
      res => {
       this.loading = false;
       this.Data = res.Data;
      });
  }
Delete(ID) {
    this.warningModel = this.modelService.show(WarningComponent, { class: 'modal-sm' });
    this.warningModel.content.boxObj.msg = 'Are you sure you want to delete ?';
    this.warningModel.content.onClose = (cancel) => {
      if (cancel) {
        this.menuService.DeleteMenu(ID).subscribe(res => {
            if (res.Success) {
              this.Data = res.Data;
              this.toastr.success(res.Message);
              this.warningModel.hide(); } else {
              this.toastr.error(res.Message);
            }});
      }
    };
  }
  addWeekely(row= null) {
    this.addEditaddressModel = this.modalService.show(AddWeekelyDealsComponent, { initialState:
    {Data: row, }, class: 'modal-sm' });
    this.addEditaddressModel.content.onClose  = () => {
    this.GetWeekelyDeals();
    };
  }
}
