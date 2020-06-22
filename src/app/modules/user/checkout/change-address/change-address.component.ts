import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { AddressService } from 'src/app/services/user/Address.service';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-address',
  templateUrl: './change-address.component.html',
  styleUrls: ['./change-address.component.css']
})
export class ChangeAddressComponent implements OnInit {
  loading = false;
  myAddress: any;
  constructor(public myModel: BsModalRef,
              public addressService: AddressService,
              public userService: UserService,
              private toastr: ToastrService, ) { }

  ngOnInit() {
    this.getaddress();
  }
  setDefaultaddress(row) {
    row.default_address = 1;
    row.user_id = this.userService.currentUser.id;
    this.addressService.Update(row).subscribe(
      res => {if (res.Success) {this.toastr.success(res.Message); this.getaddress(); } else {this.toastr.error(res.Message); }});
  }
  getaddress() {
    this.loading = true;
    this.addressService.GetList(this.userService.currentUser.id).subscribe(res => {
      this.myAddress = res.Data;
      this.loading = false; });
  }


}
