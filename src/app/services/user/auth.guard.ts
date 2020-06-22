import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot, Router, NavigationEnd } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { LocalStorageService } from 'angular-2-local-storage';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor( private router: Router,
               public localStorageService: LocalStorageService,
               private userService: UserService) { }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.userService.currentUser != null) {

        this.userService.CheckToken(this.userService.currentUser.id).subscribe(
            res => {
                if (res.Success) {
                } else {

                 this.localStorageService.remove('accessToken');
                 this.localStorageService.remove('currentUser');
                 window.location.reload();
                // this.router.navigate(['/user/home']).then((e)=>{if (e) {window.location.reload()}});
                }
            }
        );

    } else {
      this.router.navigate(['login']);
      return false;
    }
  }


}
