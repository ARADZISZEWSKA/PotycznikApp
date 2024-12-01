import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectInvCatPage } from './select-inv-cat.page';

const routes: Routes = [
  {
    path: '',
    component: SelectInvCatPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectInvCatPageRoutingModule {}
