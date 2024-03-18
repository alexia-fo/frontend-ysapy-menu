import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AbmcMenuComponent } from './pages/abmc-menu/abmc-menu.component';
import { ListMenuComponent } from './pages/list-menu/list-menu.component';

const routes: Routes = [
  {
    path: '',
    component:MainComponent,
    children:[
      {
        path:'listMenu',
        component:ListMenuComponent
      },
      {
        path:'abmcMenu',
        component:AbmcMenuComponent
      },
      {
        path:'abmcMenu/:idCabecera',
        component:AbmcMenuComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
