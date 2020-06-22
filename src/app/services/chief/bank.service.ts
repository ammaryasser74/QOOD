
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class BrankService {
    private controller = '/Bank';
    constructor(private webApi: WebApiService) { }

    GetList() {
        return this.webApi.get(`${this.controller}/GetList`);
    }

}
