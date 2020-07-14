import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';
export interface MealFilter {
    cusines_id?: any;
    category_id?: number;
    city_id?: number;
    min_price?: number;
    max_price?: number;
    no_persons?: number;
    isactive?: any;
    SearchField?: string;
    UserID?: any;
    filterType?: number;
    KitchenID?: number;
    day_id?: any;
  }
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
    GetList(ChiefID) {
        return this.webApi.get(`${this.controller}/GetList?ChiefID=${ChiefID}&per_page=100`);
    }
  
    GetByID(ID,userID){
        return this.webApi.get(`${this.controller}/MenuDetails/${ID}?UserID=${userID}`);
    }
    MyFavouriteMenu(UserID) {
        return this.webApi.get(`${this.controller}/PopularMenu/${UserID}`);
    }
    Delete(AddressID, UserID) {
        return this.webApi.get(`${this.controller}/Delete?AddressID=` + AddressID + '&UserID=' + UserID);
    }
    Post(myParam) {
        return this.webApi.post(`/Kitchen${this.controller}/Post`, myParam);
    }
    Update(myParam) {
        return this.webApi.post(`${this.controller}/Update`, myParam);
    }
    DeleteMenu(MemuID) {
        return this.webApi.get(`/Kitchen${this.controller}/Delete/` + MemuID);
    }
}
