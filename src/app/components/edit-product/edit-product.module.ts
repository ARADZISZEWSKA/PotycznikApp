import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';  
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditProductComponent } from './edit-product.component';  

@NgModule({
  declarations: [EditProductComponent],  
  imports: [
    CommonModule,
    IonicModule,
    FormsModule, 
    ReactiveFormsModule,  
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  exports: [EditProductComponent]  
})
export class EditProductModule {}
