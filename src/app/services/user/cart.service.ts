import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { UserService } from './user.service';
import { LocalStorageService } from 'angular-2-local-storage';
import { ToastrService } from 'ngx-toastr';
@Injectable()
export class CartService {
    private controller = '/Cart';
    Total = 0;
    delivery_fee = 0;
    mynewData = {weeklydeals: [], dishes: []};
    myData = [];
    TotalStorage = 0;
    itemExsist = false;
    constructor(private webApi: WebApiService,
                private userService: UserService,
                private toastr: ToastrService,
                private localStorageService: LocalStorageService,
            ) { }

    AddDishtoMyCart(myParam) {
        return this.webApi.post(`${this.controller}/AddDishtoMyCart`, myParam);
    }
    addWeeklyDealtoMyCart(myParam) {
        return this.webApi.post(`${this.controller}/addWeeklyDealtoMyCart`, myParam);
    }
    updateQuantity(myParam) {
        return this.webApi.post(`${this.controller}/updateQuantity`, myParam);
    }
    MyCart(UserID) {
        return this.webApi.get(`${this.controller}/MyCart/` + UserID);
    }
    RemovefromMyCart(myParam) {
        return this.webApi.post(`${this.controller}/RemovefromMyCart`, myParam);
    }
    DeleteMyCart(UserID) {
        return this.webApi.get(`${this.controller}/DeleteMyCart?UserID=${UserID}`);
    }
    updateCard() {
        this.MyCart(this.userService.currentUser.id).subscribe(
        res => {
        this.localStorageService.set('mycart', null);
        if (res.Data == null) {
        this.localStorageService.set('mycart', null);
    } else {
            this.localStorageService.set('mycart', res.Data);
        }
        this.calculateTotal(res.Data); return true;
        } );
    }
    deleteFromCardStorage(mealID, type) {
         this.mynewData = this.localStorageService.get('mycart');
         if (type == 'Dish') {
            const index = this.mynewData.dishes.findIndex(i => i.id == mealID);
            this.mynewData.dishes.splice(index, 1);
         } else {
            const index = this.mynewData.weeklydeals.findIndex(i => i.id == mealID);
            this.mynewData.weeklydeals.splice(index, 1);
         }
         this.localStorageService.set('mycart', this.mynewData);
         this.calculateTotal(this.mynewData);
    }

    updateCardStorage(data) {
         if (this.localStorageService.get('mycart') == null ) {
            this.localStorageService.set('mycart', this.mynewData);
        } else {
            this.mynewData = this.localStorageService.get('mycart');
        }

         if (data.Type == 'Dish') {
          if (this.mynewData.weeklydeals.length == 0) {
                  // case 1 no item before
                  if (this.mynewData.dishes.length == 0) {
                    this.mynewData.dishes.push(data);
                    this.calculateTotal(this.mynewData);
                    this.localStorageService.set('mycart', this.mynewData);
                    return true;
                  } else {
                    for (let index = 0; index < 1; index++) {
                        const element = this.mynewData.dishes[index];
                        if (data.chief_id == element.chief_id) {
                            // exsit item
                            for (let index = 0; index < this.mynewData.dishes.length; index++) {
                                const element = this.mynewData.dishes[index];
                                if (data.id == element.id) {
                                    const x = element.pivot.quantity + data.pivot.quantity;
                                    if (x > 0) {
                                       // data.pivot.quantity=x;
                                        console.log(this.mynewData.dishes, 'llls');
                                        this.mynewData.dishes.filter(i => i.id == element.id).map(i => i.pivot.quantity = x);
                                        //  this.mynewData.dishes.splice(index, 1);
                                        //  this.mynewData.dishes.push(data);
                                        this.localStorageService.set('mycart', this.mynewData.dishes);
                                        this.itemExsist = true;
                                        this.localStorageService.set('mycart', this.mynewData);
                                        this.calculateTotal(this.mynewData);
                                        return true;
                                    } else {
                                        return true;
                                        this.itemExsist = true;
                                    }
                                }
                            }
                            if (this.itemExsist === false) {
                                  // new item
                                this.mynewData.dishes.push(data);
                                this.localStorageService.set('mycart', this.mynewData);
                                this.calculateTotal(this.mynewData);
                                return true;
                            }
                        } else {
                            return false;
                        }
                    }
                  }
            } else {
              return false;
            }
        } else {
            if (this.mynewData.dishes.length == 0) {
                  // case 1 no item before
                  if (this.mynewData.weeklydeals.length == 0) {
                    this.mynewData.weeklydeals.push(data);
                    this.calculateTotal(this.mynewData);
                    this.localStorageService.set('mycart', this.mynewData);
                    return true;
                  } else {
                    for (let index = 0; index < 1; index++) {
                        const element = this.mynewData.weeklydeals[index];
                        if (data.chief_id == element.chief_id) {
                            // exsit item
                            for (let index = 0; index < this.mynewData.weeklydeals.length; index++) {
                                const element = this.mynewData.weeklydeals[index];
                                if (data.id == element.id) {
                                    const x = element.pivot.quantity + data.pivot.quantity;
                                    if (x > 0) {
                                        data.pivot.quantity = x;
                                        const index = this.mynewData.weeklydeals.findIndex(i => i.id == element.id);
                                        this.mynewData.weeklydeals.splice(index, 1);
                                        this.mynewData.weeklydeals.push(data);
                                        this.localStorageService.set('mycart', this.mynewData.weeklydeals);
                                        this.itemExsist = true;

                                        this.localStorageService.set('mycart', this.mynewData);
                                        this.calculateTotal(this.mynewData);
                                        return true;
                                    } else {
                                        return true;

                                        this.itemExsist = true;
                                    }
                                }
                            }
                            if (this.itemExsist === false) {
                                console.log('da5al hena la2z');
                                  // new item
                                this.mynewData.weeklydeals.push(data);
                                this.localStorageService.set('mycart', this.mynewData);
                                this.calculateTotal(this.mynewData);
                                return true;
                            }
                        } else {
                            return false;
                        }
                    }
                  }
            } else {
              return false;
            }
        }
    }
    calculateTotal(myData) {
    if (myData) {
        this.Total = 0;
        this.localStorageService.set('mycarttotal', 0);
        this.localStorageService.set('delivery_fee', 0);
        if (myData.dishes != null) {
       this.delivery_fee = 0;
       myData.dishes.forEach(element => {
        this.Total += element.pivot.price * element.pivot.quantity;
        this.delivery_fee = element.chief.delivery_fee;
        this.localStorageService.set('mycarttotal', this.Total);
        this.localStorageService.set('delivery_fee', this.delivery_fee);
       });
    }
        if (myData.weeklydeals != null) {
       myData.weeklydeals.forEach(element => {
        this.Total += element.pivot.price * element.pivot.quantity;
        this.localStorageService.set('mycarttotal', this.Total);
        this.localStorageService.set('delivery_fee', element.chief.delivery_fee );
       });
     }
    }
    }

}
