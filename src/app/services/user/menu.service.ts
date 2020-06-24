import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class MenuService {
    private controller = '/Menu';
    constructor(private webApi: WebApiService) { }
    NewMenu(UserID) {
        return this.webApi.get(`${this.controller}/NewMenu?UserID=${UserID}`);
    }
    PopularMenu(UserID) {
        return this.webApi.get(`${this.controller}/PopularMenu?UserID=${UserID}`);
    }
    
    AddMenutoMyFavourite(myParam) {
        return this.webApi.post(`${this.controller}/AddMenutoMyFavourite`, myParam);
    }
    Filter(myParam){
        return this.webApi.post(`${this.controller}/Filter`, myParam);
    }
    GetByID(ID,userID){
        return this.webApi.get(`${this.controller}/MenuDetails/${ID}?UserID=${userID}`);
    }

}
