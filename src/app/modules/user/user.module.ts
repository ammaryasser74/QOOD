import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRouting } from './user-routing.module';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { SharedModule } from 'src/app/sharedModules/shared.module';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { HelpComponent } from './help/help.component';
import { CategoryService } from 'src/app/services/user/categories.service';
import { LanguageService } from 'src/app/services/language.service';
import { BrandService } from 'src/app/services/user/brand.service';
import { CityService } from 'src/app/services/user/city.service';
import { SettingService } from 'src/app/services/user/setting.service';
import { ContactUsService } from 'src/app/services/user/contactus.service';
import { ToastrService } from 'ngx-toastr';
import { AboutUsService } from 'src/app/services/user/aboutus.service';
import { AccountComponent } from './account/account.component';
import { ResetPasswordComponent } from './account/reset-password/reset-password.component';
import { MealsService } from 'src/app/services/meals/meals.service';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { MealModalComponent } from './meal-details/meal-modal/meal-modal.component';
import { BookEventComponent } from './book-event/book-event.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SearchComponent } from './search/search.component';
import { RequestEventComponent } from './book-event/request-event/request-event.component';
import { EventService } from 'src/app/services/user/event.service';
import { AddAddressComponent } from './account/add-address/add-address.component';
import { ChangeAddressComponent } from './checkout/change-address/change-address.component';
import { RatingModule } from 'ng-starrating';
import { AddressService } from 'src/app/services/user/Address.service';
import { ShoppingComponent } from './shopping/shopping.component';
import { CartService } from 'src/app/services/user/cart.service';
import { AuthServiceConfig } from 'angularx-social-login';
import { provideConfig } from 'src/app/app.module';
import { Ng5SliderModule } from 'ng5-slider';
import { NgSelectModule } from '@ng-select/ng-select';
import { BookMarkService } from 'src/app/services/user/bookmark.service';

import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { ContinuShoppingComponent } from './continu-shopping/continu-shopping.component';
import { OrderService } from 'src/app/services/user/order.service';
import { PaymentMethodService } from 'src/app/services/user/paymentmethod.service';
import { OrderDetailsComponent } from './account/order-details/order-details.component';
import { WarningComponent } from 'src/app/sharedModules/warning/warning.component';
import { ForgetPasswordComponent } from './account/forget-password/forget-password.component';
import { WeekelyDealsComponent } from './weekely-deals/weekely-deals.component';
import { WeekelyDealsService } from 'src/app/services/user/weekely-deals.service';
import { DealComponent } from './weekely-deals/deal/deal.component';
import { DayDishModalComponent } from './weekely-deals/deal/day-dish-modal/day-dish-modal.component';
import { LayoutsModule } from 'src/app/sharedModules/layouts/layouts.module';
import { InvoiceReciptComponent } from './account/order-details/invoice-recipt/invoice-recipt.component';
import { BsLocaleService, PaginationModule } from 'ngx-bootstrap';
import { ResetMyPasswordComponent } from './reset-my-password/reset-mypassword.component';
import { AuthGuard } from 'src/app/services/user/auth.guard';
import { GroceryComponent } from './grocery/grocery.component';
import { GroceryService } from 'src/app/services/user/grocery.service';
import { MenuService } from 'src/app/services/user/menu.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/user/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    PaginationModule,
    LayoutsModule,
    FormsModule,
    RatingModule,
    NgSelectModule,
    Ng5SliderModule,
    RouterModule.forChild(UserRouting),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  entryComponents: [
    MealModalComponent,
    RequestEventComponent,
    AddAddressComponent,
    ResetPasswordComponent,
    ChangeAddressComponent,
    WarningComponent,
    ForgetPasswordComponent,
    DayDishModalComponent,
  ],
  declarations: [
    HomeComponent,
    ContactusComponent,
    AboutUsComponent,
    PrivacyComponent,
    TermsComponent,
    HelpComponent,
    AccountComponent,
    ResetPasswordComponent,
    MealDetailsComponent,
    MealModalComponent,
    BookEventComponent,
    CheckoutComponent,
    SearchComponent,
    RequestEventComponent,
    AddAddressComponent,
    ChangeAddressComponent,
    ShoppingComponent,
    ContinuShoppingComponent,
    OrderDetailsComponent,
    ForgetPasswordComponent,
    WeekelyDealsComponent,
    DealComponent,
    DayDishModalComponent,
    InvoiceReciptComponent,
    ResetMyPasswordComponent,
    GroceryComponent,
  ],

  providers: [
    CategoryService,
    LanguageService,
    BrandService,
    CityService,
    SettingService,
    ContactUsService,
    AboutUsService,
    AuthGuard,
    MealsService,
    EventService,
    AddressService,
    BookMarkService,
    KitchenService,
    OrderService,
    PaymentMethodService,
    WeekelyDealsService,
    GroceryService,
    MenuService,
    CartService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig,
    },
  ],
})
export class UserModule {}
