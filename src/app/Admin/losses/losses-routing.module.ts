import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LossesPage } from './losses.page';

const routes: Routes = [
  {
    path: '',
    component: LossesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LossesPageRoutingModule {}
