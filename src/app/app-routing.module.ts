import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { EditProductComponent } from './User/components/edit-product/edit-product.component'; 

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home-user',
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
    path: 'edit-product',
    loadChildren: () => import('./User/components/edit-product/edit-product.module').then(m => m.EditProductModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./User/add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'inventory-details',
    loadChildren: () => import('./Admin/inventory-details/inventory-details.module').then( m => m.InventoryDetailsPageModule)
  },
  {
    path: 'losses',
    loadChildren: () => import('./User/losses/losses.module').then( m => m.LossesPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },  {
    path: 'review-loss',
    loadChildren: () => import('./Admin/review-loss/review-loss.module').then( m => m.ReviewLossPageModule)
  },
  {
    path: 'add-user',
    loadChildren: () => import('./Admin/add-user/add-user.module').then( m => m.AddUserPageModule)
  },




 
  

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
