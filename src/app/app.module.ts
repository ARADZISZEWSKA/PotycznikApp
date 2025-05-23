import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; 

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeUserPageModule } from './User/home-user/home-user.module'; 
import { SharedModule } from './components/shared.module'; 
import { EditProductModule } from './User/components/edit-product/edit-product.module';

@NgModule({
  declarations: [AppComponent,],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    HomeUserPageModule, 
    HttpClientModule, 
    SharedModule,
    EditProductModule, 
    FormsModule, 
    ReactiveFormsModule, 
   ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
