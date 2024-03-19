import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';
import { Product, ProductsMenuDia } from '../../models/products-menu';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{

  productsDay: Product[] = [];
  fecha: Date = new Date();//nada mas para evitar errores en  el template al no inicializar
  observacion = '';
  
  constructor(private serviceP: ProductListService){}

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
}
