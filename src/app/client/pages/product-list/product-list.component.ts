import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit{
  
  constructor(private serviceP: ProductListService){}

  ngOnInit(): void {
    this.serviceP.obtenerProductos().subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }
}
