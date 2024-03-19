import { Injectable } from '@angular/core';
import { Carrito } from '../models/shopping-cart';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor() { }


  //todo: por ahora los precios  de los productos agregados al carrito de compras pueden estar desactualizados
  //por que el administrador puede modificarlo  una vez que los clientes agreguen al carrito almacenado en el localStorage
  //todo: porsteriormente se puede implementar un websocket para actualizar los precios desde  el backend
  //por ahora solo se tomaran los precios actualizado al momento del pago(aunque aun no se si el pago se realizara en linea)
  guardarCarrito(carrito: Carrito){
    localStorage.setItem('carrito_ysapy', JSON.stringify(carrito));
  }

  obtenerCarrito(){
    const carrito=localStorage.getItem('carrito_ysapy');
    if(carrito){
      const carritoJson = JSON.parse(carrito);
      return carritoJson;
    }
    return {}
  }

  removerCarrito() {
    localStorage.removeItem('carrito_ysapy');
  }
}
