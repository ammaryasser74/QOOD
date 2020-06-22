import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
@Injectable()
export class BookMarkService {
    private controller = '/BookMark';
    constructor(private webApi: WebApiService) { }

    Post(myParam) {
        return this.webApi.post(`${this.controller}/Add`, myParam);
    }
    GetList(UserID) {
        return this.webApi.get(`${this.controller}/GetList/` + UserID);
    }


}
