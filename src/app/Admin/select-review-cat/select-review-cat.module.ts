import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { SelectReviewCatPageRoutingModule } from './select-review-cat-routing.module';
import { SelectReviewCatPage } from './select-review-cat.page';

import { SharedModule } from '../../card/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectReviewCatPageRoutingModule,
    SharedModule
  ],
  declarations: [SelectReviewCatPage]
})
export class SelectReviewCatPageModule {}
