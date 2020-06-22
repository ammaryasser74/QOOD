import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { catchError, retry, tap, map } from 'rxjs/operators';

import { Router } from '../../../node_modules/@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { LanguageService } from './language.service';
import { UserService } from './user/user.service';

export interface ResultViewModel {
    Success: boolean;
    Message: string;
    Data: any;
    IsAuthorized: boolean;
}

@Injectable()
export class WebApiService {
    resources: any[] = [];
    constructor(
        private http: HttpClient,
        private localStorageService: LocalStorageService,
        private languageService: LanguageService,
     //   private userService:UserService

    ) {
    }
    private setHeaders(): HttpHeaders {
        const headersConfig = {
            'Content-Type': 'application/json',
            'X-localization': this.languageService.getLanguageOrDefault(),
            Accept: 'application/json',
            'X-Requested-With': 'application/XMLHttpRequest',
            Authorization: String('Bearer ' + this.localStorageService.get('accessToken') || ''),
        };
        return new HttpHeaders(headersConfig);
    }
    private logError(filename, error: any) {

    }
    private log(path, data) {
        if (!environment.production) {}
        // console.log(path, data);
    }

    get(path: string, params?: HttpParams): Observable<ResultViewModel> {
        return this.http.get<ResultViewModel>(`${environment.api_url}${path}`,
        { headers: this.setHeaders(), params }).pipe(tap(data => this.log(path, data),
        error => this.logError(path, error)));
    }
    post(path: string, body: Object = {}): Observable<ResultViewModel> {
        return this.http.post<ResultViewModel>(`${environment.api_url}${path}`,
        body, { headers: this.setHeaders() }).pipe(tap(data => this.log(path, data),
        error => this.logError(path, error)));
    }
    put(path: string, body: Object = {}): Observable<ResultViewModel> {
        return this.http.put<ResultViewModel>
        (`${environment.api_url}${path}`, body,
        { headers: this.setHeaders() }).pipe
        (tap(data => this.log(path, data),
         error => this.logError(path, error)));
    }
    delete(path: string, params?: HttpParams): Observable<ResultViewModel> {
        return this.http.delete<ResultViewModel>(`${environment.api_url}${path}`, { headers: this.setHeaders(), params }).pipe(tap(data => this.log(path, data), error => this.logError(path, error)));
    }
    fileUpload(path: string, body: Object = {}): Observable<ResultViewModel> {
        return this.http.post<ResultViewModel>(`${environment.api_url}${path}`, body, { headers: this.setHeaders(), reportProgress: true }).pipe(tap(data => this.log(path, data), error => this.logError(path, error)));
    }
    publicPost(path: string, body: Object = {}): Observable<ResultViewModel> {
        return this.http.post<ResultViewModel>(`${environment.api_url}${path}`, body, { headers: this.setHeaders() }).pipe(tap(data => this.log(path, data), error => this.logError(path, error)));
    }
    publicGet(path: string, params?: HttpParams): Observable<ResultViewModel> {
        return this.http.get<ResultViewModel>(`${environment.api_url}${path}`, { headers: this.setHeaders(), params }).pipe(tap(data => this.log(path, data), error => this.logError(path, error)));
    }
}
