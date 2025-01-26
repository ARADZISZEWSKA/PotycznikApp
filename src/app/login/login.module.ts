import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HomePage } from './login.page';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { HomePageRoutingModule } from './login-routing.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    ReactiveFormsModule,
  ],
  declarations: [HomePage]
})
export class HomePageModule {}
