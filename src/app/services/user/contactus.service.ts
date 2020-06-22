import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class ContactUsService {
    private controller = '/ContactUs';
    constructor(private webApi: WebApiService) { }

    Post(myParam) {
        return this.webApi.post(`${this.controller}/Post`, myParam);
    }
    GetMessageType() {
        return this.webApi.get(`${this.controller}/GetMessageType`);
    }
    subscribe() {
        return this.webApi.post(`/GetMessageType`);
    }
}
