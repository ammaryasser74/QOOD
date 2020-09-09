import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './sharedModules/routing.module';
import { LocalStorageModule } from 'angular-2-local-storage';
import { ToastrModule } from 'ngx-toastr';
import { SocialLoginModule, AuthServiceConfig } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { AuthGuard } from './services/user/auth.guard';
import { UserService } from './services/user/user.service';
import { CartService } from './services/user/cart.service';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireModule } from '@angular/fire';
// for auth    
import {AngularFireAuthModule} from 'angularfire2/auth';
// for database
import {AngularFireDatabaseModule} from 'angularfire2/database';
const config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider(
      '545303809549-hpft9hr6kjjaaj6c8ptdjmhe3t2kucpe.apps.googleusercontent.com'
    ),
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('2179781775454775'),
  },
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      // positionClass: 'toast-bottom-right',
    }), // ToastrModule added,
    TranslateModule.forRoot(),
    LocalStorageModule.forRoot({
      prefix: 'Qoot',
      storageType: 'localStorage',
    }),
    SocialLoginModule,
    DateInputsModule,
    AngularFireModule.initializeApp(environment.firebase),
    //AngularFireDatabaseModule,
    AngularFirestoreModule,
    ServiceWorkerModule.register('sw.js', {
      enabled: environment.production,
    }),
  ],
  providers: [AuthGuard, UserService, CartService],
  bootstrap: [AppComponent],
})
export class AppModule {}
