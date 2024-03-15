import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { AbmcMenuComponent } from './pages/abmc-menu/abmc-menu.component';

const routes: Routes = [
  {
    path: '',
    component:MainComponent,
    children:[
      {
        path:'abmcMenu',
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
