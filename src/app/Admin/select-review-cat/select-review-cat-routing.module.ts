import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectReviewCatPage } from './select-review-cat.page';

const routes: Routes = [
  {
    path: '',
    component: SelectReviewCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectReviewCatPageRoutingModule {}
