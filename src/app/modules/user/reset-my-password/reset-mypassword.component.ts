
import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-reset-mypassword',
  templateUrl: './reset-mypassword.component.html',
  styleUrls: ['./reset-mypassword.component.css']
})
export class ResetMyPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activeRoute: ActivatedRoute,
    public userService: UserService,
    private toastr: ToastrService, ) { }

  ngOnInit() {

    this.initForm();
  }
  initForm() {
    this.form = this.formBuilder.group({
      token: this.activeRoute.snapshot.paramMap.get('id'),
      new_password: [null, Validators.required],
      new_password_confirmation: [null, Validators.required],
  });
  }
  save() {
    if (this.form.valid) {
        this.userService.ForgotPassword(this.form.value).subscribe(
          res => {
             if (res.Success) {
               this.toastr.success(res.Message);
               this.router.navigate(['/user/home']); } else {this.toastr.error(res.Message); }
          });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}

