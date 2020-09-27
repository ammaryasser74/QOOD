
import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';
export interface Filter {
    name?:any
    per_page?:any,
    page?:any
  }
@Injectable()
export class ChatService {
    private controller = '/Chat';
    constructor(private webApi: WebApiService) { }

    getUser(params: Filter) {
        return this.webApi.get(`${this.controller}/getUser?`, Object.getOwnPropertyNames(params).reduce((p, key) => p.set(key, String(params[key])), new HttpParams()));
    }
    getLastMessages(user_id) {
        return this.webApi.get(`${this.controller}/getLastMessages?user_id=${user_id}`);
    }
   
}
