import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SelectInvCatPageRoutingModule } from './select-inv-cat-routing.module';

import { SelectInvCatPage } from './select-inv-cat.page';
import { SharedModule } from '../../card/shared.module'; // Importujemy SharedModule


@NgModule({
  declarations: [SelectInvCatPage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule, 
    SelectInvCatPageRoutingModule
  ]
})

export class SelectInvCatPageModule {}
