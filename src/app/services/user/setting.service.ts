
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class SettingService {
    private controller = '/Setting';
    constructor(private webApi: WebApiService) { }
    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }
    subscribe(paramter) {
        return this.webApi.post(`/Subscribe/Post`, paramter);
    }
    QootReference() {
        return this.webApi.get(`/QootReference/GetList`);
    }


}
