import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReviewLossPageRoutingModule } from './review-loss-routing.module';

import { ReviewLossPage } from './review-loss.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReviewLossPageRoutingModule
  ],
  declarations: [ReviewLossPage]
})
export class ReviewLossPageModule {}
