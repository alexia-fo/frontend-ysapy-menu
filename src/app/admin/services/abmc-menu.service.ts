import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Menu, ProductList, resCMenuSemanal } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AbmcMenuService {

  private apiUrl =`${environment.API_URL}/menu/admin/menuWeekly`

  constructor(
    private http:HttpClient
  ) { }

  //todo: falta el paginado
  listMenu():Observable<resCMenuSemanal>{
    return this.http.get<resCMenuSemanal>(`${this.apiUrl}`);
  }

  getMenuSelected(idCabecera:number):Observable<Menu>{
    return this.http.get<Menu>(`${this.apiUrl}/${idCabecera}`);
  }

  //para ABMC de menus

  productList():Observable<ProductList>{
    return this.http.get<ProductList>(`${environment.API_URL}/menu/admin/products`);
    //TODO: falta manejo de errores   
  }

  saveMenu(menu:Menu):Observable<any>{//todo: falta modelo de mensaje como respuesta
    return this.http.post<any>(`${this.apiUrl}`, {menu});//el body tendra un objeto menu, si no ponia las llaves se obtendria directamente las propiedades del menu
  }
  
}
