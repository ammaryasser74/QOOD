import { Component, OnInit } from '@angular/core';
import { DishService } from 'src/app/services/chief/dish.service';
import { UserService } from 'src/app/services/user/user.service';
import { AddDishComponent } from './add-dish/add-dish.component';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { KitchenService ,Filter} from 'src/app/services/chief/kitchen.service';
import { LanguageService } from 'src/app/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {
  filter: Filter = {  ChiefID: this.userService.currentUser.chief_id, SearchField:'',per_page:10,current_page: 1};
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

  ngOnInit(){
    this.myUrl = environment.api_imges;
    this.userService.GetByID(this.userService.currentUser.id).subscribe(res => {this.appprove = res.Data.is_approved; });
    this.getDishes();
  }

  getDishes() {
    this.loading = true;
    this.kitchenService.GetListpaging(this.filter).subscribe(
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
    this.addEditaddressModel = this.modalService.show(AddDishComponent, { initialState:
    {Data: row, }, class: 'modal-sm' });
    this.addEditaddressModel.content.onClose  = (res) => {
    this.getDishes();
    };
  }
  
  pageChanged(event: any): void {
    this.filter.current_page = event.page;
    this.getDishes();
   }
}
