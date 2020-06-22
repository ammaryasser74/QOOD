import { Component, OnInit } from '@angular/core';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { LanguageService } from 'src/app/services/language.service';
import { MenuService } from 'src/app/services/chief/menu.service';
import { UserService } from 'src/app/services/user/user.service';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css'],
})
export class MenusComponent implements OnInit {
  loading = true;
  warningModel: BsModalRef;
  myOrderParam: any;
  appprove: any;
  Days: any = [];
  menus: any;
  day_id = 0;
  addEditaddressModel: BsModalRef;
  constructor(
    private modalService: BsModalService,
    private menuService: MenuService,
    private toastr: ToastrService,
    private modelService: BsModalService,
    private userService: UserService,
    private kitchenService: KitchenService,
    public languageService: LanguageService
  ) {}

  ngOnInit() {
    this.userService.GetByID(this.userService.currentUser.id).subscribe(res => {
      this.appprove = res.Data.is_approved;
      this.loading = false;
    });
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const d = new Date();
    const dayName = days[d.getDay()];
    this.kitchenService.Days().subscribe(res => {
      this.Days = res.Data;
      this.day_id = this.Days.find(i => i.en_name == dayName).id;
      this.getMenus();
    });
  }
  getMenus() {
    this.myOrderParam = {
      chief_id: this.userService.currentUser.chief_id,
      day_id: this.day_id,
    };
    this.menuService.GetList(this.myOrderParam).subscribe(res => {
      res.Data.map(i => (i.img1 = environment.api_imges + i.img1));
      this.menus = res.Data;
    });
    // this.loading=false;
  }
  addmenu(row, edit) {
    this.addEditaddressModel = this.modalService.show(AddMenuComponent, {
      initialState: { Data: row, isEdit: edit },
      class: 'modal-sm',
    });
    this.addEditaddressModel.content.onClose = res => {};
  }
  ReadyNow(menuID) {
    this.myOrderParam = {
      dish_id: menuID,
      chief_id: this.userService.currentUser.chief_id,
    };
    this.menuService.ReadyNow(this.myOrderParam).subscribe(res => {
      if (res.Success) {
        this.toastr.success(res.Message);
      } else {
        this.toastr.error(res.Message);
      }
    });
  }

  Delete(menuID) {
    this.myOrderParam = {
      dish_id: menuID,
      chief_id: this.userService.currentUser.chief_id,
      day_id: this.day_id,
    };
    this.warningModel = this.modelService.show(WarningComponent, {
      class: 'modal-sm',
    });
    this.warningModel.content.boxObj.msg =
      'Are you sure you want to delete this Dish ?';
    this.warningModel.content.onClose = cancel => {
      if (cancel) {
        this.menuService.DeleteMenu(this.myOrderParam).subscribe(res => {
          if (res.Success) {
            this.getMenus();
            this.toastr.success(res.Message);
            this.warningModel.hide();
          } else {
            this.toastr.error(res.Message);
          }
        });
      }
    };
  }
}
