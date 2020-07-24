import { Component, OnInit } from '@angular/core';
import * as moment from 'moment-timezone';
import { OrderService } from 'src/app/services/user/order.service';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { LanguageService } from 'src/app/services/language.service';
@Component({
  selector: 'app-invoice-recipt',
  templateUrl: './invoice-recipt.component.html',
  styleUrls: ['./invoice-recipt.component.css']
})
export class InvoiceReciptComponent implements OnInit {

  order: any;
  Date: any;
  loading = false;
  constructor(private oderservice: OrderService,
              private activeRoute: ActivatedRoute,
              private userService: UserService,
              public languageService: LanguageService,
              private localStorageService: LocalStorageService, ) { }

  ngOnInit() {
   this.order = this.localStorageService.get('Bill-recept');
  //  this.localStorageService.remove('Bill-recept');
  //   this.loading=true;
   this.oderservice.OrderDetails(+this.activeRoute.snapshot.paramMap.get('id'), this.userService.currentUser.id)
    .subscribe(res => {this.order = res.Data; this.loading = false;
      console.log(this.order,"asd");
      
   });
   this.Date = moment().format('YYYY-MM-DD hh:mm:ss A');
  }

}
