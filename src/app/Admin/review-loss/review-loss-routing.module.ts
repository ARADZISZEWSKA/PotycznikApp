import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewLossPage } from './review-loss.page';

const routes: Routes = [
  {
    path: '',
    component: ReviewLossPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReviewLossPageRoutingModule {}
