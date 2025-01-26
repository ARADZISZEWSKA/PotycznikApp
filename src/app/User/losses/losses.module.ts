import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/components/shared.module';
import { LossesPageRoutingModule } from './losses-routing.module';

import { LossesPage } from './losses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LossesPageRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [LossesPage]
})
export class LossesPageModule {}
