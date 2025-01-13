import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InventoryDetailsPageRoutingModule } from './inventory-details-routing.module';

import { InventoryDetailsPage } from './inventory-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InventoryDetailsPageRoutingModule
  ],
  declarations: [InventoryDetailsPage]
})
export class InventoryDetailsPageModule {}
