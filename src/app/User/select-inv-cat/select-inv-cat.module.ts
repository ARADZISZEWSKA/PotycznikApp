import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SelectInvCatPageRoutingModule } from './select-inv-cat-routing.module';

import { SelectInvCatPage } from './select-inv-cat.page';
import { SharedModule } from '../../components/shared.module'; // Importujemy SharedModule
import { ProductService } from '../../Services/product.service';  // Upewnij się, że serwis jest zaimportowany


@NgModule({
  declarations: [SelectInvCatPage],
  imports: [
    CommonModule,
    IonicModule,
    SharedModule, 
    SelectInvCatPageRoutingModule
  ],
  providers: [ProductService]
})

export class SelectInvCatPageModule {}
