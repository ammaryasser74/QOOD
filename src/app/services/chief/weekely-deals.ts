
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class WeekelyDealsService {
    private controller = '/Kitchen/WeeklyDeal';
    constructor(private webApi: WebApiService) { }

    Post(myParam) {
        return this.webApi.post(`${this.controller}/Post`, myParam);
    }
    SubscribeUpdated(myParam) {
        return this.webApi.post(`${this.controller}/SubscribeUpdated`, myParam);
    }
    update(myParam) {
        return this.webApi.post(`${this.controller}/Update`, myParam);
    }
    Show(ID) {
        return this.webApi.post(`${this.controller}/Show` + ID);
    }

    GetList(ChiefID) {
        return this.webApi.get(`${this.controller}/GetList?ChiefID=` + ChiefID);
    }
    Delete(ID) {
        return this.webApi.get(`${this.controller}/Delete/` + ID);
    }
    UserSubscribe(ChiefID) {
        return this.webApi.get(`${this.controller}/UserSubscribe?ChiefID=` + ChiefID);
    }

}
