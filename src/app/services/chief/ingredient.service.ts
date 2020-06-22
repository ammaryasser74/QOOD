
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class IngredientService {
    private controller = '/Kitchen/Ingredient';
    constructor(private webApi: WebApiService) { }

    Post(myParam) {
        return this.webApi.post(`${this.controller}/Post`, myParam);
    }
    NumberOfPortions(myParam) {
        return this.webApi.post(`${this.controller}/NumberOfPortions`, myParam);
    }
    GetList(myParam) {
        return this.webApi.post(`${this.controller}/GetList`, myParam);
    }
    Delete(ID) {
        return this.webApi.get(`${this.controller}/Delete/` + ID);
    }

}
