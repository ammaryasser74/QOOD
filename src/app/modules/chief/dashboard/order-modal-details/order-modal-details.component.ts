import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/user/order.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user/user.service';
import { LanguageService } from 'src/app/services/language.service';
import { BsModalRef } from 'ngx-bootstrap';
@Component({
  selector: 'app-order-modal-details',
  templateUrl: './order-modal-details.component.html',
  styleUrls: ['./order-modal-details.component.css'],
})
export class OrderModalDetailsComponent implements OnInit {
  OrderID: number;
  Data: any;
  constructor(
    private oderservice: OrderService,
    private activeRoute: ActivatedRoute,
    public myModel: BsModalRef,
    private userService: UserService,
    public languageService: LanguageService,
    private router: Router
  ) {}

  ngOnInit() {}
}
