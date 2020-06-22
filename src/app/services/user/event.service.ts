import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class EventService {
    private controller = '/Event';
    constructor(private webApi: WebApiService) { }
    Post(myParam) {
        return this.webApi.post(`${this.controller}/Post`, myParam);
    }

}
