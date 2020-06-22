import { Injectable } from '@angular/core';
import { WebApiService } from '../webApi.service';
import { HttpParams } from '@angular/common/http';
import { LocalStorageService } from 'angular-2-local-storage';
import { Router } from '@angular/router';
import { retry } from 'rxjs/operators';
import { log } from 'util';
import { SwPush } from '@angular/service-worker';
import { of, from } from 'rxjs';

@Injectable()
export class UserService {
  private controller = '/User';
  constructor(
    private webApi: WebApiService,
    private swPush: SwPush,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}
  Post(myParam) {
    return this.webApi.post(`${this.controller}/Post`, myParam);
  }
  SendCodeVerify(myParam) {
    return this.webApi.post(`${this.controller}/SendCodeVerify`, myParam);
  }
  subscribe(myParam) {
    return this.webApi.post(`/subscribe`, myParam);
  }
  updateWallet(userID) {
    return this.webApi.get(`${this.controller}/UpdateWallet?UserID=${userID}`);
  }
  Update(myParam) {
    return this.webApi.post(`${this.controller}/Update`, myParam);
  }
  CheckToken(userId) {
    return this.webApi.get(`/CheckToken/` + userId);
  }
  uploadImage(myParam) {
    return this.webApi.post(`${this.controller}/UploadImage`, myParam);
  }
  Login(myParam) {
    return this.webApi.post(`${this.controller}/Login`, myParam);
  }
  SendToken(myParam) {
    return this.webApi.post(`${this.controller}/SendToken`, myParam);
  }
  ChangePassword(myParam) {
    return this.webApi.post(`${this.controller}/ChangePassword`, myParam);
  }
  ForgotPassword(myParam) {
    return this.webApi.post(`${this.controller}/ForgotPassword`, myParam);
  }
  GetByID(UserID) {
    return this.webApi.get(`${this.controller}/GetByID?UserID=${UserID}`);
  }
  get currentUser() {
    if (this.localStorageService.get('currentUser')) {
      return this.localStorageService.get('currentUser') as any;
    } else {
      return null;
    }
  }
  checkmyToken() {
    if (this.currentUser != null) {
      this.CheckToken(this.currentUser.id).subscribe(res => {
        if (res.Success) {
        } else {
          this.localStorageService.remove('accessToken');
          this.localStorageService.remove('currentUser');
          this.router.navigate(['/user/home']);
        }
      });
    }
  }

  LogOut(cb?: any) {
    if (this.currentUser.type == 'customer') {
      this.localStorageService.remove('mycart');
      this.localStorageService.remove('mycarttotal');
    }
    // this.router.navigate(['/user/home']).then( (e) => {if (e) {window.location.reload()}});
    return this.webApi
      .get(`${this.controller}/Logout/` + this.currentUser.id)
      .subscribe(res => {
        if (res.Success) {
          this.swPush.unsubscribe();
          this.localStorageService.remove('accessToken');
          this.localStorageService.remove('currentUser');
          this.router.navigate(['/user/home']).then(e => {
            if (e) {
              window.location.reload();
            }
          });
        } else {
          this.localStorageService.remove('accessToken');
          this.localStorageService.remove('currentUser');
          this.router.navigate(['/user/home']).then(e => {
            if (e) {
              window.location.reload();
            }
          });
        }
        // window.location.reload();
        // cb && cb(res);
      });
  }
}
