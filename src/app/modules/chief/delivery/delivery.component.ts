import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { DeliveryManService } from 'src/app/services/chief/delivery-man.service';
import { UserService } from 'src/app/services/user/user.service';
import {
  HttpRequest,
  HttpClient,
  HttpEventType,
  HttpResponse,
} from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {
  form: FormGroup;
  fileData = null;
  myavatar:any
  loading: boolean
  constructor(private deliveryManService: DeliveryManService,
    private userService: UserService,
    private toastr: ToastrService,
    private http: HttpClient,
    private formBuilder: FormBuilder,) { }

  ngOnInit() {
   
    this.loading = true
    this.initForm()
    this.deliveryManService.DeliveryMan(this.userService.currentUser.chief_id).subscribe(
      res => {
        this.loading = false
        if (res.Data) {
         this.myavatar=res.Data.img?environment.api_imges+res.Data.img:null
          this.form.patchValue(res.Data)
        }
      }
    )
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]); // read file as data url
      this.fileData = event.target.files[0] as File;
      reader.onload = (event: any) => {
         this.myavatar = (event.target.result);
      };
    }
  }
  onSubmit() {
    if (this.fileData == null) {
      this.toastr.error('اختر صوره اولا');
    } else {
      const formData = new FormData();
      formData.append('img', this.fileData);
  
      this.http.request(new HttpRequest('POST' , `${environment.api_url}/UploadImage`,
      formData, {reportProgress: true}))
      .subscribe(event => {
        if (event.type === HttpEventType.Response) {
          if (event.body['Success']) {
           // this.toastr.success('Image uploaded Sucessfully');
            this.form.get('img').setValue(event.body['Data'].image); 
            this.update()
            
          } else {
            this.toastr.error('something wrong upload again');
          }
        }
      });
      
    }
  }
  initForm() {
    this.form = this.formBuilder.group({
      firstname: [null, Validators.required],
      lastname: [null, Validators.required],
      phone: [null, [Validators.required, Validators.pattern('(05)[0-9]{8}')]],
      chief_id: this.userService.currentUser.chief_id,
      img: [null]
    });
  }
  update() {
    this.deliveryManService.post(this.form.value).subscribe(
      res => {
        if (res.Success) {
          this.toastr.success(res.Message); this.form.patchValue(res.Data);
        }
        else { this.toastr.error(res.Message); }
      });

  }
}
