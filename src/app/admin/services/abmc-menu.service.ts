import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ProductList } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class AbmcMenuService {



  apiUrl =`${environment.API_URL}/menu/admin/products`

  constructor(
    private http:HttpClient
  ) { }

  productList():Observable<ProductList>{
    return this.http.get<ProductList>(`${this.apiUrl}`);
    //TODO: falta manejo de errores
  }
  
}
