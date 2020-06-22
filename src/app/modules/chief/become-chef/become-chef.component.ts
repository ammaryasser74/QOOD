import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap';
import { RegisterChiefComponent } from './register-chief/register-chief.component';
import { UserService } from 'src/app/services/user/user.service';


@Component({
  selector: 'app-become-chef',
  templateUrl: './become-chef.component.html',
  styleUrls: ['./become-chef.component.css']
})
export class BecomeChefComponent implements OnInit {

  constructor(private modalService: BsModalService,
              private userService: UserService) { }

  ngOnInit() {
  }
  registerNow() {
    this.modalService.show(RegisterChiefComponent, {
      class: 'modal-lg-width'});
  }
}
