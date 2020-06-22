import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { CartService } from 'src/app/services/user/cart.service';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-continu-shopping',
  templateUrl: './continu-shopping.component.html',
  styleUrls: ['./continu-shopping.component.css']
})
export class ContinuShoppingComponent implements OnInit {
  myCart: any;
  loading = false;
  id_array: any = [];
  constructor( public userService: UserService,
               public cartService: CartService,
               public languageService: LanguageService,
    ) { }
  ngOnInit() {
    this.loading = true;
    this.cartService.MyCart(this.userService.currentUser.id).subscribe(res => {this.myCart = res.Data;  this.loading = false;
                                                                               this.myCart.forEach(element => {
        const index = this.id_array.indexOf(element.chief.kitchen_name);
        if (index < 0) {
          this.id_array.push(element.chief.kitchen_name);
          this.loading = false;
        }
      });
      // this.calculateTotal(res.Data)
      });
  }

}
