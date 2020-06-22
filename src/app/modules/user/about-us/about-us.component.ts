import { Component, OnInit } from '@angular/core';
import { AboutUsService } from 'src/app/services/user/aboutus.service';
import { LanguageService } from 'src/app/services/language.service';


@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.css']
})
export class AboutUsComponent implements OnInit {
  Data: any;
  loading: boolean;
  constructor(public aboutUsService: AboutUsService,

              public languageService: LanguageService ) { }

  ngOnInit() {
    this.loading = true;
    this.aboutUsService.Get().subscribe(res => {this.Data = res.Data; this.loading = false; });
  }
}
