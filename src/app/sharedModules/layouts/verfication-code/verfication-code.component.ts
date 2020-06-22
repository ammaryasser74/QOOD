import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'angularx-social-login';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { CartService } from 'src/app/services/user/cart.service';

@Component({
  selector: 'app-verfication-code',
  templateUrl: './verfication-code.component.html',
  styleUrls: ['./verfication-code.component.css']
})
export class VerficationCodeComponent implements OnInit {
  CodeVerify: number;
  onClose:any;
  myDataforcard: any = [];
  code: number;
  myOrderParam: any;
  constructor(
    public  userService: UserService,
    public  modalService: BsModalService,
    private toastr: ToastrService,
    public  myModel: BsModalRef,
    public  authService: AuthService,
    public  localStorageService: LocalStorageService,
    public  router: Router, ) { }

  ngOnInit() {
    this.userService.SendCodeVerify(this.userService.currentUser).subscribe(res => {
      if (res.Success) {
            this.CodeVerify= res.Data.CodeVerify;

      } else {
        this.toastr.error(res.Message);
      }
    });
  }
  save() {
    if (this.CodeVerify != this.code) {
      this.toastr.error('verfication code not correct');
    } else {
      this.userService.updateWallet(this.userService.currentUser.id).subscribe(
        res => {
           if (res.Success) {this.toastr.success(res.Message);
                             this.userService.GetByID(this.userService.currentUser.id).subscribe(
              res => {
                this.localStorageService.set('currentUser', res.Data);
              }
            );
                             this.myModel.hide();
                             this.onClose(res.Data)
           } else {this.toastr.error(res.Message); }
        });
     }
  }

  }


