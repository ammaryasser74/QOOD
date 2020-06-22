import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ContactUsService } from 'src/app/services/user/contactus.service';
import { ToastrService } from 'ngx-toastr';
import { LanguageService } from 'src/app/services/language.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  form: FormGroup;
  loading = true;
  messageType: any[] = [];
  constructor(private formBuilder: FormBuilder,
              public  contactUsService: ContactUsService,
              private toastr: ToastrService,
              private router: Router,
              public languageService: LanguageService) { }

  ngOnInit() {
    this.loading = true;
    this.initForm();
    this.contactUsService.GetMessageType().subscribe(res => {
      this.messageType = res.Data;
      this.loading = false;
      });
  }
  initForm() {
    this.form = this.formBuilder.group({
      ID: [0],
      Name: [null, Validators.required],
      Mobile: [null, [Validators.required, Validators.pattern('(05)[0-9]{8}')]],
      Email: [null, Validators.required],
      Message: [null, Validators.required],
      msgType: [null, Validators.required],
    });
  }

  save() {
    if (this.form.valid) {
     this.contactUsService.Post(this.form.value).subscribe(
       res => {
          if (res.Success) {this.toastr.success(res.Message); this.form.reset();
                            this.router.navigate(['/user/home']); } else {this.toastr.error(res.Message); }
       });
    } else {
      for (const control in this.form.controls) {
        this.form.get(control).markAsDirty();
      }
    }
  }
}
