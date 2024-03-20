import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { Producto } from '../../models/shopping-cart';


@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  basketProducts: Producto[] = [];

  constructor(
    private serviceSC: ShoppingCartService
  ) { }

  ngOnInit() {
    let carrito = this.serviceSC.obtenerCarrito();

    if (carrito) {
      this.basketProducts = carrito.productos;
      console.log("shopping cart: ", this.basketProducts);
    }
  }

  deleteProduct(idproducto: number) {
    this.basketProducts.forEach((p, i) => {
      if (p.idproducto === idproducto) {
        //this.basketProducts = this.basketProducts.splice(i, 1);
        this.basketProducts.splice(i, 1);
      }
    });

    this.serviceSC.guardarCarrito({productos: this.basketProducts});
    
  }
  
  decreaseQuantity(producto: Producto) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
    }
    
    this.serviceSC.guardarCarrito({productos: this.basketProducts});
    
  }
  
  increaseQuantity(producto: Producto) {
    producto.cantidad++;

    this.serviceSC.guardarCarrito({productos: this.basketProducts});
  }

}
