import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BarCategoryPageRoutingModule } from './bar-category-routing.module';

import { BarCategoryPage } from './bar-category.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BarCategoryPageRoutingModule
  ],
  declarations: [BarCategoryPage]
})
export class BarCategoryPageModule {}
