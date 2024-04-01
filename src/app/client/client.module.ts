import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientRoutingModule } from './client-routing.module';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MainComponent } from './main/main.component';
import { ShoppingCartComponent } from './pages/shopping-cart/ShoppingCartComponent';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    MenuListComponent,
    ProductListComponent,
    MainComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
    
  ]
})
export class ClientModule { }
