import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

//para configuracion global de los pipes, es decir, que en todos los modulos de los componentes este en formato español 
import { LOCALE_ID } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    //debe ser importado aqui
    HttpClientModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es' } // Configura el idioma español

  ],
  bootstrap: [AppComponent]
})
export class AppModule { 
  //para configuracion global de los pipes, es decir, que en todos los modulos de los componentes este en formato español 
  constructor() {
    registerLocaleData(localeEs); // Registra el idioma español
  }
  
}
