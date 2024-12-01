import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeUserPage } from '../home-user/home-user.page';
import { SharedModule } from '../../card/shared.module'; 
import { IonicModule } from '@ionic/angular';
import { HomeUserPageRoutingModule } from './home-user-routing.module';


@NgModule({
  declarations: [HomeUserPage],
  imports: [
    CommonModule,
    SharedModule, 
    IonicModule,
    HomeUserPageRoutingModule
  ],
  exports: [HomeUserPage],
})
export class HomeUserPageModule {}
