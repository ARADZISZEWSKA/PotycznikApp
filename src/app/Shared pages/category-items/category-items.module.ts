import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { CategoryItemsPageRoutingModule } from './category-items-routing.module';
import { CategoryItemsPage } from './category-items.page';
import { SharedModule } from '../../components/shared.module';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryItemsPageRoutingModule,
    SharedModule
  ],
  declarations: [CategoryItemsPage]
})
export class CategoryItemsPageModule {}
