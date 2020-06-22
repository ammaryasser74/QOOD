import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';
export interface WeekelyFilter {
    filterType?: number;
    KitchenID?: number;
  }
@Injectable()
export class WeekelyDealsService {
    private controller = '/WeeklyDeal';
    constructor(private webApi: WebApiService) { }
    GetWeekydealsForKitchen(myParam) {
        return this.webApi.post(`${this.controller}/Kitchen`, myParam);
    }
    Subscribe(myParam) {
        return this.webApi.post(`${this.controller}/Subscribe`, myParam);
    }
    GetByID(dealID, UserID) {
        return this.webApi.get(`${this.controller}/Details/` + dealID + '/' + UserID);
    }
    MySubscribe(UserID) {
        return this.webApi.get(`${this.controller}/MySubscribe?UserID=` + UserID);
    }
    GetishDay(myParam) {
        return this.webApi.post(`${this.controller}/Dishes`, myParam);

    }

}
