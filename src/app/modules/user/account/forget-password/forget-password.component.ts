
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {
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
      email: [null, Validators.required],
  });
  }
  save() {
    if (this.form.valid) {
        this.userService.SendToken(this.form.value).subscribe(
          res => {
             if (res.Success) {
               this.toastr.success(res.Message); this.myModel.hide(); } else {this.toastr.error(res.Message); }
          });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}

