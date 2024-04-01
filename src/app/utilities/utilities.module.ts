import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MenubarComponent } from './components/menubar/menubar.component';



@NgModule({
  declarations: [
    MenubarComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports:[
    MenubarComponent
  ]
})
export class UtilitiesModule { }
