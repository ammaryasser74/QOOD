import { Component, OnInit } from '@angular/core';
import {
  KitchenService,
  OrderFilter,
} from 'src/app/services/chief/kitchen.service';
import { UserService } from 'src/app/services/user/user.service';
import * as moment from 'moment';
import { LanguageService } from 'src/app/services/language.service';
import { ToastrService } from 'ngx-toastr';
import { WeekelyDealsService } from 'src/app/services/chief/weekely-deals';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})

// 'pending','confirmed',rejected
// 'canceled-by-customer'

// 'ontheway','canceled-by-admin'
export class OrdersComponent implements OnInit {
  orders: any;
  tab = 1;
  loading = true;
  UserSubscribeData: any;
  myOrderParam: any;
  filter: OrderFilter = {
    ChiefID: this.userService.currentUser.chief_id,
    StartDate: new Date(),
    EndDate: new Date(),
  };
  constructor(
    private kitchenService: KitchenService,
    private weekelyDealsService: WeekelyDealsService,
    private userService: UserService,
    private toastr: ToastrService,
    public languageService: LanguageService
  ) {}
  ngOnInit() {
    this.tab = 1;
    this.search();
  }
  search() {
    this.loading = true;
    this.kitchenService.kitchenOrder(this.filter).subscribe(res => {
      this.loading = false;
      this.orders = res.Data;
    });
  }
  UpdateStatus(OrderID, status) {
    this.loading = true;
    this.myOrderParam = {
      OrderID,
      ChiefID: this.userService.currentUser.chief_id,
      status,
    };
    this.kitchenService.UpdateStatus(this.myOrderParam).subscribe(res => {
      if (res.Success) {
        this.toastr.success(res.Message);
        this.search();
        this.loading = false;
      } else {
        this.toastr.error(res.Message);
      }
    });
  }

  SubscribeUpdated(code, status) {
    this.myOrderParam = { status, code };
    this.weekelyDealsService
      .SubscribeUpdated(this.myOrderParam)
      .subscribe(res => {
        if (res.Success) {
          this.toastr.success(res.Message);
          this.search();
          this.loading = false;
        } else {
          this.toastr.error(res.Message);
        }
      });
  }
}
