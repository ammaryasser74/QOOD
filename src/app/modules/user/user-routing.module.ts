import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutUserComponent } from 'src/app/sharedModules/layouts/layout-user/layout-user.component';
import { HomeComponent } from './home/home.component';
import { Route } from '@angular/router';
import { AboutUsComponent } from './about-us/about-us.component';
import { ContactusComponent } from './contactus/contactus.component';
import { HelpComponent } from './help/help.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { TermsComponent } from './terms/terms.component';
import { AccountComponent } from './account/account.component';
import { MealDetailsComponent } from './meal-details/meal-details.component';
import { BookEventComponent } from './book-event/book-event.component';
import { SearchComponent } from './search/search.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { ContinuShoppingComponent } from './continu-shopping/continu-shopping.component';
import { OrderDetailsComponent } from './account/order-details/order-details.component';
import { WeekelyDealsComponent } from '../user/weekely-deals/weekely-deals.component';
import { DealComponent } from './weekely-deals/deal/deal.component';
import { InvoiceReciptComponent } from './account/order-details/invoice-recipt/invoice-recipt.component';
import { ResetMyPasswordComponent } from './reset-my-password/reset-mypassword.component';
import { MessagesComponent } from './messages/messages.component';


export const UserRouting: Route[] = [
  {
    path: 'orders-bill-recept/:id',
    component: InvoiceReciptComponent,
  },

  {
    path: '',
    component: LayoutUserComponent,
    children: [
      { path: 'reset-password/:id', component: ResetMyPasswordComponent },
      { path: 'home', component: HomeComponent },
      { path: 'about-us', component: AboutUsComponent },
      { path: 'contact-us', component: ContactusComponent },
      { path: 'help', component: HelpComponent },
      { path: 'privacy', component: PrivacyComponent },
      { path: 'terms', component: TermsComponent },
      { path: 'account/:id', component: AccountComponent },
      { path: 'meal-details/:id', component: MealDetailsComponent },
      { path: 'book-event', component: BookEventComponent },
      { path: 'search/:cityID/:catID/:kitchenID', component: SearchComponent },
      { path: 'checkout', component: CheckoutComponent },
      { path: 'continu-shopping', component: ContinuShoppingComponent },
      { path: 'weekely-deals', component: WeekelyDealsComponent },
      { path: 'shopping', component: ShoppingComponent },
      { path: 'order-details/:id', component: OrderDetailsComponent },
      { path: 'deal/:id', component: DealComponent },
      { path: 'message', component: MessagesComponent },
     
    ],
  },
];
