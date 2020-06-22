import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { LanguageService } from 'src/app/services/language.service';

@Component({
  selector: 'app-warning',
  templateUrl: './warning.component.html',
  styleUrls: ['./warning.component.css']
})
export class WarningComponent implements OnInit {
  onClose: any;
  boxObj: {msg?: string, yes?: string, no?: string} = {
    msg: 'Are you sure?', yes:this.languageService.getLanguageOrDefault()=='ar'?'نعم':'Yes', no: this.languageService.getLanguageOrDefault()=='ar'?'لا':'No'
  };

  constructor(
    public warningModel: BsModalRef,
    public languageService:LanguageService) { }

  ngOnInit() {
  }
}
