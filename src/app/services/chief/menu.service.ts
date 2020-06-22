import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class MenuService {
    private controller = '/Kitchen/Menu';
    constructor(private webApi: WebApiService) { }
    GetList(myParam) {
        return this.webApi.post(`${this.controller}/GetList`, myParam);
    }
    DeleteMenu(myParam) {

        return this.webApi.post(`${this.controller}/DeleteMenu`, myParam);
    }
    UpdateMenu(myParam) {
        return this.webApi.post(`${this.controller}/UpdateMenu`, myParam);
    }
    AddMenu(myParam) {
        return this.webApi.post(`${this.controller}/AddMenu`, myParam);
    }
    ReadyNow(myParam) {
        return this.webApi.post(`${this.controller}/ReadyNow`, myParam);
    }

}
