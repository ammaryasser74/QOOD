
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AddressService {
    private controller = '/Address';
    constructor(private webApi: WebApiService) { }

    GetList(UserID) {
        return this.webApi.get(`${this.controller}/GetList?UserID=${UserID}`);
    }
    GetByID(AddressID, UserID) {
        return this.webApi.get(`${this.controller}/GetByID?AddressID=` + AddressID + '&UserID=' + UserID);
    }
    Delete(AddressID, UserID) {
        return this.webApi.get(`${this.controller}/Delete?AddressID=` + AddressID + '&UserID=' + UserID);
    }
    Post(myParam) {
        return this.webApi.post(`${this.controller}/Post`, myParam);
    }
    Update(myParam) {
        return this.webApi.post(`${this.controller}/Update`, myParam);
    }

}
