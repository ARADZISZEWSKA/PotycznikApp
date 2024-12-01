import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectInvCatPageRoutingModule } from './select-inv-cat-routing.module';

import { SelectInvCatPage } from './select-inv-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectInvCatPageRoutingModule
  ],
  declarations: [SelectInvCatPage]
})
export class SelectInvCatPageModule {}
