import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BarCategoryPage } from './bar-category.page';

const routes: Routes = [
  {
    path: '',
    component: BarCategoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BarCategoryPageRoutingModule {}
