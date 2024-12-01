import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./login/login.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home-user',
    loadChildren: () => import('./home-user/home-user.module').then( m => m.HomeUserPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'select-inv-cat',
    loadChildren: () => import('./select-inv-cat/select-inv-cat.module').then( m => m.SelectInvCatPageModule)
  },
  {
    path: 'select-review-cat',
    loadChildren: () => import('./select-review-cat/select-review-cat.module').then( m => m.SelectReviewCatPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
