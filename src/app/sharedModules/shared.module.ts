import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { IntlModule } from '@progress/kendo-angular-intl';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { ChartsModule } from 'ng2-charts';
import {
  ModalModule,
  PaginationModule,
  PopoverModule,
  BsDatepickerModule,
  BsDropdownModule,
  BsLocaleService,
  TimepickerModule,
  BsDatepickerConfig,
} from 'ngx-bootstrap';

defineLocale('en', enGbLocale);
defineLocale('ar', arLocale);
import { enGbLocale, arLocale } from 'ngx-bootstrap/locale';
import { FormatedDatePipe } from './Formated-datedate.pipe';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { LayoutsModule } from './layouts/layouts.module';
import { WebApiService } from '../services/webApi.service';
import { LanguageService } from '../services/language.service';
import { environment } from '../../environments/environment';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { SettingService } from '../services/user/setting.service';
import { RatingModule } from 'ng-starrating';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { SubLayoutService } from '../services/sub-layout.service';
import { WarningModule } from './warning/warning.module';
import { PusherService } from '../services/user/pusher.service';

@NgModule({
  imports: [
    LayoutsModule,
    RatingModule,
    Ng5SliderModule,
    ButtonsModule,
    DropDownsModule,
    CommonModule,
    HttpClientModule,
    WarningModule,
    RouterModule,
    FormsModule,
    NgSelectModule,
    ChartsModule,
    // SchedulerModule,
    IntlModule,
    DateInputsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    ReactiveFormsModule,
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    SlickCarouselModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAjus-Mtp0GYGzF083gK8NFQfH7py8Wd2Q',
    }),
  ],
  declarations: [FormatedDatePipe],
  exports: [
    LayoutsModule,
    ChartsModule,
    ModalModule,
    CommonModule,
    RouterModule,
    FormsModule,
    WarningModule,
    ReactiveFormsModule,
    PaginationModule,
    PopoverModule,
    IntlModule,
    ButtonsModule,
    DropDownsModule,
    BsDatepickerModule,
    DateInputsModule,
    TimepickerModule,
    BsDropdownModule,
    SlickCarouselModule,
    FormatedDatePipe,
    AgmCoreModule,
    
  ],
  providers: [
    WebApiService,
    TranslateService,
    LanguageService,
    SettingService,
    SubLayoutService,
    PusherService
  ],
})
export class SharedModule {
  constructor(
    private translateService: TranslateService,
    private languageService: LanguageService,
    private localeService: BsLocaleService,
    private bsDatepickerConfig: BsDatepickerConfig
  ) {
    // this.localeService.use(this.languageService.getLanguageOrDefault());
    this.bsDatepickerConfig.dateInputFormat = environment.defaultDateFormat;
    this.bsDatepickerConfig.containerClass = 'theme-green';
  }
}
