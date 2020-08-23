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
    mynewData = [];
    myData = [];
    TotalStorage = 0;
    itemExsist = false;
    constructor(private webApi: WebApiService,
                private userService: UserService,
                private toastr: ToastrService,
                private localStorageService: LocalStorageService,
            ) { }

    AddMenutoMyCart(myParam) {
        return this.webApi.post(`${this.controller}/AddMenutoMyCart`, myParam);
    }

    addWeeklyDealtoMyCart(myParam) {
        return this.webApi.post(`${this.controller}/addWeeklyDealtoMyCart`, myParam);
    }
    updateQuantity(myParam) {
        return this.webApi.post(`${this.controller}/updateQuantity`, myParam);
    }
    updateQuantityWithText(myParam) {
        return this.webApi.post(`${this.controller}/updateQuantityWithText`, myParam);
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
    deleteFromCardStorage(mealID) {
         this.mynewData = this.localStorageService.get('mycart');
        
            const index = this.mynewData.findIndex(i => i.id == mealID);
            this.mynewData.splice(index, 1);
        
         this.localStorageService.set('mycart', this.mynewData);
         this.calculateTotal(this.mynewData);
    }

    updateCardStorage(data) {
     
         if (this.localStorageService.get('mycart') == null ) {
            this.localStorageService.set('mycart', this.mynewData);
            this.mynewData=[]
        } else {
            this.mynewData = this.localStorageService.get('mycart');
        }
                  // case 1 no item before
                  if (this.mynewData.length == 0) {
                    this.mynewData.push(data);
                    this.calculateTotal(this.mynewData);
                    this.localStorageService.set('mycart', this.mynewData);
                    return true;
                  } else {
                    for (let index = 0; index < 1; index++) {
                        const element = this.mynewData[index];
                        // if (data.chief.id == element.chief_id) {
                            // exsit item
                            for (let index = 0; index < this.mynewData.length; index++) {
                                const element = this.mynewData[index];
                                if (data.id == element.id) {
                                    const x = element.pivot.quantity + data.pivot.quantity;
                                    if (x > 0) {
                                       // data.pivot.quantity=x;
                                        console.log(this.mynewData, 'llls');
                                        this.mynewData.filter(i => i.id == element.id).map(i => i.pivot.quantity = x);
                                      
                                        this.localStorageService.set('mycart', this.mynewData);
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
                                return false
                                  // new item
                                // this.mynewData.push(data);
                                // this.localStorageService.set('mycart', this.mynewData);
                                // this.calculateTotal(this.mynewData);
                                return true;
                            }
                        // } else {
                        //     return false;
                        // }
                    }
                  }
    }
    calculateTotal(myData) {
    if (myData) {
        this.Total = 0;
        this.localStorageService.set('mycarttotal', 0);
        this.localStorageService.set('delivery_fee', 0);
        if (myData != null) {
       this.delivery_fee = 0;
       myData.forEach(element => {
        this.Total += element.pivot.price * element.pivot.quantity;
        console.log(this.Total,"lll");
        // this.delivery_fee = element.chief.delivery_fee;
        this.localStorageService.set('mycarttotal', this.Total);
        this.localStorageService.set('delivery_fee', 0);
       });
    }

    }
    }

}
