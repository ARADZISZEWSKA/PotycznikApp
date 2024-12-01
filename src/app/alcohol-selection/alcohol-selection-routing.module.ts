import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AlcoholSelectionPage } from './alcohol-selection.page';

const routes: Routes = [
  {
    path: '',
    component: AlcoholSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AlcoholSelectionPageRoutingModule {}
