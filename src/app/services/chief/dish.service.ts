import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DishService {
    private controller = '/Dish';
    constructor(private webApi: WebApiService) { }
    GetByID(chiefID) {
        return this.webApi.get(`${this.controller}/GetByID/` + chiefID);
    }
    Rate(myParam) {
        return this.webApi.post(`${this.controller}/Rate`, myParam);
    }
    GetList(chiefID) {
        return this.webApi.get(`${this.controller}/GetList/` + chiefID);
    }
    Days() {
        return this.webApi.get(`/Day/GetList`);
    }

}
