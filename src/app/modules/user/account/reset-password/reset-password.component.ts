import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  passwordNotMatch: any;
  constructor(public myModel: BsModalRef,
              private formBuilder: FormBuilder,
              public userService: UserService,
              private toastr: ToastrService, ) { }

  ngOnInit() {
    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      id: [0],
      current_password: [null, Validators.required],
      new_password: [null, Validators.required],
      new_password_confirmation: [null, Validators.required],
      UserID: [null],
  });
  }
  save() {
    this.form.value.UserID = this.userService.currentUser.id;
    if (this.form.valid) {
        this.userService.ChangePassword(this.form.value).subscribe(
          res => {
             if (res.Success) {
               this.toastr.success(res.Message);
               this.myModel.hide();
               this.userService.checkmyToken();
              } else {this.toastr.error(res.Message); }
          });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
