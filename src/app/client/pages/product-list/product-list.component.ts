import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';
import { Product, ProductsMenuDia } from '../../models/products-menu';
import { Producto } from '../../models/shopping-cart';
import { ShoppingCartService } from '../../services/shopping-cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  productsDay: Product[] = [];
  fecha: Date = new Date();//nada mas para evitar errores en  el template al no inicializar
  observacion = '';
  shoppingCart: Producto[]=[];
  
  constructor(
    private serviceP: ProductListService,
    private serviceSC: ShoppingCartService
  ){}

  ngOnInit(): void {
    this.serviceP.productosMenuDia().subscribe({
      next:(response: ProductsMenuDia)=>{
        this.productsDay = response.productos;
        this.fecha = response.fecha;
        this.observacion = response.observacion;

        console.log(this.productsDay)
      },
      error:(error)=>{//TODO: falta mostrar los mensajes de error 
        console.log(error);
      }
    })
  }

  // Omit<Product, 'cantidad' | 'img' | 'item' | 'observacion'
  agregarCarrito(producto: Product){
    let productExists=false;

    console.log(producto)

    const {idproducto, nombre, precio} = producto;

    this.shoppingCart.forEach(p => {
      if(producto.idproducto===p.idproducto){
        productExists=true;
      }
    });

    if(productExists){
      alert("El producto ya se encuentra en el carrito de compras");
    }else{
      this.shoppingCart.push({idproducto, nombre, precio,  cantidad:1});
      alert("Producto agregado al carrito de compras");
    
      this.serviceSC.guardarCarrito({productos: this.shoppingCart});
    }
  }
}
