
import { LayoutUserComponent } from 'src/app/sharedModules/layouts/layout-user/layout-user.component';
import { Route } from '@angular/router';

import { KitchenComponent } from './kitchen/kitchen.component';
import { ChefAccountComponent } from './chef-account/chef-account.component';
import { BecomeChefComponent } from './become-chef/become-chef.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DishesComponent } from './dishes/dishes.component';
import { WalletComponent } from './wallet/wallet.component';
import { OrdersComponent } from './orders/orders.component';
import { MenusComponent } from './menus/menus.component';
import { IngredientCalculatorComponent } from './ingredient-calculator/ingredient-calculator.component';
import { WeekelyDealsComponent } from './../chief/weekely-deals/weekely-deals.component';
import { GroceryComponent } from './../chief/grocery/grocery.component';
import { GallaryComponent } from './gallary/gallary.component';
import { DeliveryComponent } from './delivery/delivery.component';
export const ChiefRouting: Route[] = [{
  path: '', component: LayoutUserComponent, children: [
    { path: 'kitchen/:id', component: KitchenComponent },
    { path: 'chef-account', component: ChefAccountComponent },
    { path: 'become-chef', component: BecomeChefComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'dishes', component: DishesComponent },
    { path: 'wallet', component: WalletComponent },
    { path: 'orders', component: OrdersComponent },
    { path: 'menus', component: MenusComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: 'ingredient-calculator', component: IngredientCalculatorComponent },
    { path: 'deals', component: WeekelyDealsComponent },
    { path: 'grocery-item', component: GroceryComponent },
    { path: 'gallary', component: GallaryComponent },
    { path: 'delivery', component: DeliveryComponent },
  ]
}];

