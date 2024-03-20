import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ProductListComponent } from './pages/product-list/product-list.component';
import { MenuListComponent } from './pages/menu-list/menu-list.component';
import { ShoppingCartComponent } from './pages/shopping-cart/ShoppingCartComponent';

const routes: Routes = [
  {
    path:"",
    component:MainComponent,
    children:[
      {
        path:'productList',
        component:ProductListComponent
      },
      {
        path:"menuList",
        component: MenuListComponent
      },
      {
        path:"shoppingCart",
        component: ShoppingCartComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
