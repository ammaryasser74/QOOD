import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';

@Injectable()
export class AboutUsService {
    private controller = '/Aboutus';
    constructor(private webApi: WebApiService) { }
    Get() {
        return this.webApi.get(`${this.controller}/Get`);
    }

}
