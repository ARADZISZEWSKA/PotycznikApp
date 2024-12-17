import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card/card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CardComponent,  ],
  imports: [CommonModule, IonicModule],
  exports: [CardComponent,  ] 
})
export class SharedModule {}
