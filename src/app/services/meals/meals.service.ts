
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
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
export class MealsService {
    private controller = '/Meal';
    constructor(private webApi: WebApiService) { }

    NewMeal(UserID) {
        return this.webApi.get(`${this.controller}/NewMeal?UserID=` + UserID);
    }
    PopularMeal(UserID) {
        return this.webApi.get(`${this.controller}/PopularMeal?UserID=` + UserID);
    }
    MyFavouriteMeal(UserID) {
        return this.webApi.get(`${this.controller}/MyFavouriteMeal/` + UserID);
    }
    AddMealtoMyFavourite(myParam) {
        return this.webApi.post(`${this.controller}/AddMealtoMyFavourite`, myParam);
    }
    MealDetails(MealID, UserID) {
        return this.webApi.get(`${this.controller}/MealDetails/` + MealID + '/' + UserID);
    }
    Rate(myParam) {
        return this.webApi.post(`${this.controller}/Rate`, myParam);
    }
    Filter(myParam) {
        return this.webApi.post(`${this.controller}/Filter`, myParam);
    }
    AddComment(myParam) {
        return this.webApi.post(`${this.controller}/AddComment`, myParam);
    }

}
