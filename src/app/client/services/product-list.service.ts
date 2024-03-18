import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductListService {

  private apiUrl = `${environment.API_URL}/menu/client/menuWeekly`

  constructor(
    private http: HttpClient
  ) { }


  obtenerCabecerasMenus(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}`);//TODO: falta el manejo de errores
  }

  productosMenuDia(): Observable<any>{
    return this.http.get<any>(`${this.apiUrl}/getProducts`);//TODO: falta el manejo de errores
  }
}
