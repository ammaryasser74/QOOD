import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class OrderService {
    private controller = '/Order';
    constructor(private webApi: WebApiService) { }
    Add(myParam) {
        return this.webApi.post(`${this.controller}/Add`, myParam);
    }
    GetList(UserID) {
        return this.webApi.get(`${this.controller}/GetList/` + UserID);
    }
    Cancele(orderID, UserID) {
        return this.webApi.get(`${this.controller}/Cancele/` + orderID + '?UserID=' + UserID);
    }
    OrderDetails(orderID, UserID) {
        return this.webApi.get(`${this.controller}/OrderDetails/` + orderID + '?UserID=' + UserID);
    }
  PromoCode(promo) {
    return this.webApi.get(`${this.controller}/PromoCode/` + promo);
}
}
