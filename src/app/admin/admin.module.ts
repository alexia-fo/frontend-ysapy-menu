import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { MainComponent } from './main/main.component';
import { ListMenuComponent } from './pages/list-menu/list-menu.component';
import { AbmcMenuComponent } from './pages/abmc-menu/abmc-menu.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchProductComponent } from './components/search-product/search-product.component';


@NgModule({
  declarations: [
    MainComponent,
    ListMenuComponent,
    AbmcMenuComponent,
    SearchProductComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
