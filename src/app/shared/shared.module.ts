import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from '../utilities/components/menubar/menubar.component';
import { MenuComponent } from './components/menu/menu.component';
import { UtilitiesModule } from '../utilities/utilities.module';
import { ProfileComponent } from './pages/profile/profile.component';

@NgModule({
  declarations: [
    MenuComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    UtilitiesModule
  ],
  exports:[
    MenuComponent
  ]
})
export class SharedModule { }
