import { Component, OnInit } from '@angular/core';
import { StarRatingComponent } from 'ng-starrating';
import { LocalStorageService } from 'angular-2-local-storage';
import { UserService } from 'src/app/services/user/user.service';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationService } from 'src/app/services/chief/Notification.service';
import { Subscription, interval } from 'rxjs';
@Component({
  selector: 'app-chief-layout',
  templateUrl: './chief-layout.component.html',
  styleUrls: ['./chief-layout.component.css'],
})
export class ChiefLayoutComponent implements OnInit {
  myavatar: any;
  Data: any;
  listNotification:[]
  tabactive: string;
  refresher: Subscription;
  constructor(
    public userService: UserService,
    private kitchenService: KitchenService,
    public notificationService:NotificationService,
    private activeRoute: ActivatedRoute,
    private toastr: ToastrService,
    private router: Router,
    public localStorageService: LocalStorageService
  ) {}

  ngOnInit() {
    this.GetListNotifiction()  
    this.refresher = interval(10000).subscribe(() => this.GetListNotifiction());
    // this.userService. ();
    this.tabactive = this.activeRoute.routeConfig.path;
  }
  GetListNotifiction(){
    if(this.userService.currentUser){
      this.notificationService.GetList(this.userService.currentUser.id).subscribe(
        res=>{
        this.listNotification=res.Data.filter(i=>i.read==0)})
      }
  }
  logout() {
    this.userService.LogOut();
  }
  Active() {
    this.kitchenService
      .Active(this.userService.currentUser.id)
      .subscribe(res => {
        if (res.Success) {
          this.localStorageService.set('currentUser', res.Data);
          this.toastr.success(res.Message);
        } else {
          this.toastr.error(res.Message);
        }
      });
  }
}
