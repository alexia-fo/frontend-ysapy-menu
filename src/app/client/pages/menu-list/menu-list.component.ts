import { Component, OnInit } from '@angular/core';
import { ProductListService } from '../../services/product-list.service';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css']
})
export class MenuListComponent implements OnInit{

  constructor(
    private serviceProduct:ProductListService
  ){}
  
  ngOnInit(){
    this.serviceProduct.obtenerCabecerasMenus().subscribe({
      next:(respuesta: any)=>{
        console.log(respuesta);
      },
      error:(error: any)=>{
        console.log(error);
      }
    });
  }

}
