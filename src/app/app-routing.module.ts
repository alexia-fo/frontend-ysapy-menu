import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { ProfileComponent } from './shared/pages/profile/profile.component';

const routes: Routes = [
  {
    path:'',
    loadChildren:()=>import('./authentication/authentication.module').then(m=>m.AuthenticationModule),

  },
  {
    path:'client',
    loadChildren:()=>import('./client/client.module').then(m=>m.ClientModule),
  },
  {
    path:'admin',
    loadChildren:()=>import('./admin/admin.module').then(m=>AdminModule)
  },
  {
    path: 'profile',
    component: ProfileComponent
  }
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
