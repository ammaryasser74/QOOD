import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { TranslateService } from '@ngx-translate/core';
import { LocalStorageService } from 'angular-2-local-storage';

@Injectable()
export class LanguageService {
  lang: string;
  constructor(
    private translateService: TranslateService,
    private localStorageService: LocalStorageService
  ) {
    this.lang = this.localStorageService.get('lang') as string;
  }

  setLanguage(lang: string) {
    this.localStorageService.set('lang', lang.toLowerCase());
    this.translateService.use(lang);
    window.location.reload();
  }
  getLanguageOrDefault() {
    if (this.lang) {
      return this.lang;
    } else {
      return environment.defaultLanguage;
    }
  }
}
