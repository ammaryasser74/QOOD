import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';
export interface Filter {
    min_price?: any;
    max_price?: any;
    UserID?: any;
    category_id?: any;
    SearchField?: any;
    per_page?: any;
    current_page?: any;
    filterType?: any;
  }
  
  

@Injectable()
export class GroceryService {
    private controller = '/Grocery';
    constructor(private webApi: WebApiService) { }
    Filter(myparam) {
        return this.webApi.post(`${this.controller}/Filter?page=${myparam.current_page}`,myparam);
    }
    Category() {
        return this.webApi.get(`${this.controller}/Category/GetList`);
    }

}
