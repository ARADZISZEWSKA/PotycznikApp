import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { BarCategoryPageRoutingModule } from './bar-category-routing.module';
import { BarCategoryPage } from './bar-category.page';

import { SharedModule } from '../../card/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarCategoryPageRoutingModule,
    SharedModule
  ],
  declarations: [BarCategoryPage]
})
export class BarCategoryPageModule {}
