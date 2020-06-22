import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChiefRouting } from './chief-routing.module';
import { KitchenComponent } from './kitchen/kitchen.component';
import { SharedModule } from 'src/app/sharedModules/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { RatingModule } from 'ng-starrating';
import {HttpClient} from '@angular/common/http';
import { BrandService } from 'src/app/services/user/brand.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChefAccountComponent } from './chef-account/chef-account.component';
import { ContactUsService } from 'src/app/services/user/contactus.service';
import { RegisterChiefComponent } from './become-chef/register-chief/register-chief.component';
import { BecomeChefComponent } from './become-chef/become-chef.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DishesComponent } from './dishes/dishes.component';
import { IngredientCalculatorComponent } from './ingredient-calculator/ingredient-calculator.component';
import { MenusComponent } from './menus/menus.component';
import { OrdersComponent } from './orders/orders.component';
import { WalletComponent } from './wallet/wallet.component';
import { ChiefLayoutComponent } from '../../sharedModules/layouts/chief-layout/chief-layout.component';
import { UserService } from 'src/app/services/user/user.service';
import { BookMarkService } from 'src/app/services/user/bookmark.service';
import { KitchenService } from 'src/app/services/chief/kitchen.service';
import { CityService } from 'src/app/services/user/city.service';
import { LanguageService } from 'src/app/services/language.service';
import { CartService } from 'src/app/services/user/cart.service';
import { ForgetPasswordComponent } from '../user/account/forget-password/forget-password.component';
import { UserModule } from '../user/user.module';
import { ResetPasswordComponent } from '../user/account/reset-password/reset-password.component';
import { AddDishComponent } from './dishes/add-dish/add-dish.component';
import { DishService } from 'src/app/services/chief/dish.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddMenuComponent } from './menus/add-menu/add-menu.component';
import { MenuService } from 'src/app/services/chief/menu.service';
import { BanKAccountService } from 'src/app/services/chief/bank-account.service';
import { BrankService } from 'src/app/services/chief/bank.service';
import { LayoutsModule } from 'src/app/sharedModules/layouts/layouts.module';
import { IngredientService } from 'src/app/services/chief/ingredient.service';
import { WeekelyDealsComponent } from './weekely-deals/weekely-deals.component';
import { AddWeekelyDealsComponent } from './weekely-deals/add-weekely-deals/add-weekely-deals.component';
import { WeekelyDealsService } from 'src/app/services/chief/weekely-deals';
import { OrderModalDetailsComponent } from './dashboard/order-modal-details/order-modal-details.component';
import { FullCalendarModule } from '@fullcalendar/angular';
import { BsModalService } from 'ngx-bootstrap';
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { AuthGuard } from 'src/app/services/user/auth.guard';
import { UnitService } from 'src/app/services/chief/unit.service';
import { GroceryComponent } from './grocery/grocery.component';
import { AddGroceryComponent } from './grocery/add-grocery/add-grocery.component';
import { GroceryService } from 'src/app/services/user/grocery.service';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/chief/', '.json');
}
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RatingModule,
    NgSelectModule,
    UserModule,
    ReactiveFormsModule,
    FormsModule,
    FullCalendarModule,
    RouterModule.forChild(ChiefRouting),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
  ],
  declarations: [
    KitchenComponent,
    ChefAccountComponent,
    RegisterChiefComponent,
    BecomeChefComponent,
    DashboardComponent,
    DishesComponent,
    IngredientCalculatorComponent,
    MenusComponent,
    OrdersComponent,
    WalletComponent,
    AddDishComponent,
    AddMenuComponent,
    WeekelyDealsComponent,
    AddWeekelyDealsComponent,
    OrderModalDetailsComponent,
    GroceryComponent,
    AddGroceryComponent,
  ],

  providers: [
    BrandService,
    ContactUsService,
    UserService,
    BookMarkService,
    KitchenService,
    CityService,
    LanguageService,
    CartService,
    DishService,
    MenuService,
    BsLocaleService,
    BanKAccountService,
    AuthGuard,
    GroceryService,
    UnitService,
    BrankService , IngredientService, WeekelyDealsService
  ],
  entryComponents: [
    RegisterChiefComponent, OrderModalDetailsComponent,
    ForgetPasswordComponent,
    ResetPasswordComponent,
    AddGroceryComponent,
    AddDishComponent,
    AddMenuComponent, AddWeekelyDealsComponent
  ],
})
export class ChiefModule { }

