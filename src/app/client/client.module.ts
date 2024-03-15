import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MainComponent } from './main/main.component';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    MenuListComponent,
    ProductListComponent,
    MainComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,

    HttpClientModule
  ]
})
export class ClientModule { }
