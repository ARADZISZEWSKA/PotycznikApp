import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectReviewCatPageRoutingModule } from './select-review-cat-routing.module';

import { SelectReviewCatPage } from './select-review-cat.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectReviewCatPageRoutingModule
  ],
  declarations: [SelectReviewCatPage]
})
export class SelectReviewCatPageModule {}
