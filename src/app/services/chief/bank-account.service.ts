
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class BanKAccountService {
    private controller = '/Kitchen/BanKAccount';
    constructor(private webApi: WebApiService) { }

    post(myParam) {
        return this.webApi.post(`${this.controller}/Post`, myParam);
    }
    GetByChiefID(ChiefID) {
        return this.webApi.get(`${this.controller}/GetByChiefID/` + ChiefID);
    }
    GetTransactionTotal(ChiefID) {
        return this.webApi.get(`${this.controller}/GetTransactionTotal/` + ChiefID);
    }
    GetTransactionHistory(ChiefID) {
        return this.webApi.get(`${this.controller}/GetTransactionHistory/` + ChiefID);
    }

}
