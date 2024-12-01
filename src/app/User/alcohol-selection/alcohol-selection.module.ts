import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AlcoholSelectionPageRoutingModule } from './alcohol-selection-routing.module';
import { AlcoholSelectionPage } from './alcohol-selection.page';

import { SharedModule } from '../../card/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlcoholSelectionPageRoutingModule,
    SharedModule
  ],
  declarations: [AlcoholSelectionPage]
})
export class AlcoholSelectionPageModule {}
