
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class DeliveryManService {
    private controller = '/Kitchen/DeliveryMan';
    constructor(private webApi: WebApiService) { }

    post(myParam) {
        return this.webApi.post(`${this.controller}/Post`, myParam);
    }
    DeliveryMan(ChiefID) {
        return this.webApi.get(`${this.controller}/` + ChiefID);
    }
   

}
