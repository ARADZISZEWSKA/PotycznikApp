import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from '../card/card.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  declarations: [CardComponent],
  imports: [CommonModule,IonicModule],
  exports: [CardComponent] // Eksportujemy CardComponent, aby był dostępny w innych modułach
})
export class SharedModule {}
