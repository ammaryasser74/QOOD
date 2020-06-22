
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class NotificationService {
    private controller = '/Notification';
    constructor(private webApi: WebApiService) { }

    GetList(UserID) {
        return this.webApi.get(`${this.controller}/GetList/`+UserID);
    }
    Read(ID) {
        return this.webApi.get(`${this.controller}/Read/`+ID);
    }

}
