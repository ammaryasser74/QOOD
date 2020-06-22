import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../services/user/auth.guard';

export const routes: Routes = [
  {
    path: 'user',
    loadChildren: 'src/app/modules/user/user.module#UserModule',
  },
  {
    path: 'chief',
    loadChildren: 'src/app/modules/chief/chief.module#ChiefModule',
  },

  { path: '**', pathMatch: 'full', redirectTo: '/user/home' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
