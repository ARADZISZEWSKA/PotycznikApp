import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home-user',
    loadChildren: () => import('./User/home-user/home-user.module').then( m => m.HomeUserPageModule)
  },
  {
    path: 'home-admin',
    loadChildren: () => import('./Admin/home-admin/home-admin.module').then( m => m.HomeAdminPageModule)
  },
  {
    path: 'select-inv-cat',
    loadChildren: () => import('./User/select-inv-cat/select-inv-cat.module').then( m => m.SelectInvCatPageModule)
  },
  {
    path: 'select-review-cat',
    loadChildren: () => import('./Admin/select-review-cat/select-review-cat.module').then( m => m.SelectReviewCatPageModule)
  },
  {
    path: 'category-items',
    loadChildren: () => import('./Shared pages/category-items/category-items.module').then( m => m.CategoryItemsPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
