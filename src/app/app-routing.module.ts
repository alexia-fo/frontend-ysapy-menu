import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';

const routes: Routes = [
  {
    path:'client',
    loadChildren:()=>import('./client/client.module').then(m=>m.ClientModule),
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>AdminModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
