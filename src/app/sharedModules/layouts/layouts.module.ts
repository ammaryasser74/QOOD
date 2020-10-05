import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { LayoutUserComponent } from './layout-user/layout-user.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { LanguageService } from 'src/app/services/language.service';
import {HttpClient} from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';

import { BsDatepickerModule, RatingModule } from 'ngx-bootstrap';
import { AuthServiceConfig, AuthService } from 'angularx-social-login';
import { provideConfig } from 'src/app/app.module';
import { ForgetPasswordComponent } from 'src/app/modules/user/account/forget-password/forget-password.component';
import { ChiefLayoutComponent } from './chief-layout/chief-layout.component';
import { SharedModule } from '../shared.module';
import { VerficationCodeComponent } from './verfication-code/verfication-code.component';
import { NotificationService } from 'src/app/services/chief/Notification.service';
import { CartService } from 'src/app/services/user/cart.service';
import { ChatService } from 'src/app/services/user/chat.service';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { MessageService } from '@progress/kendo-angular-l10n';
import { OccasionService } from 'src/app/services/user/occasion.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'src/assets/i18n/layout/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule,
    RatingModule,
    InfiniteScrollModule,
    BsDatepickerModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BsDropdownModule.forRoot(),

  ],
  declarations: [
    LayoutUserComponent,
    SignupComponent,
    LoginComponent,
    ChiefLayoutComponent,
    VerficationCodeComponent

  ],
  entryComponents: [
    SignupComponent,
    LoginComponent,
    ForgetPasswordComponent,
    VerficationCodeComponent
  ],
  exports: [
    LayoutUserComponent, ChiefLayoutComponent,
    FormsModule, RatingModule
  ],
  providers: [
    LanguageService,
    UserService,
    OccasionService,
    NotificationService,
    ChatService,
    MessageService,
    AuthService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class LayoutsModule { }

