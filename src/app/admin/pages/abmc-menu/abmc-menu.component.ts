import { Component, OnInit } from '@angular/core';
import { AbmcMenuService } from '../../services/abmc-menu.service';
import { Product, ProductList, ProductMenu } from '../../models/product';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-abmc-menu',
  templateUrl: './abmc-menu.component.html',
  styleUrls: ['./abmc-menu.component.css']
})
export class AbmcMenuComponent implements OnInit{

  products:Product[] = [];

  productsMenu: ProductMenu[] =  [];

  productSelected!:Product;

  //para la cabecera del menu
  formHead = this.formBuilder.group({
    fecha: [new Date().toDateString, [Validators.required]],
    observacion: ['']
  });

  //para agregar productos al array
  formDetail = this.formBuilder.group({
    idproducto: ['', [Validators.required]],
    nombre:[''],
    observacion: ['']
  })

  constructor(
    private serviceProduct: AbmcMenuService,
    private formBuilder: FormBuilder
    ){}

  ngOnInit(){
    this.serviceProduct.productList().subscribe({
      next:(response: ProductList)=>{
        this.products = response.products;
      },
      error:(error)=>{
        console.log(error);
      }
    })
  }

  addProductMenu(){
    console.log(this.formDetail.value);
  }

  saveMenu(){
    console.log(this.productsMenu);
  }

  setProductSelected(product: Product){
    this.productSelected=product;
    console.log(this.productSelected.idProducto.toString())
    //this.formDetail.get('idproducto')?.setValue(this.productSelected.idProducto.toString())
    //this.formDetail.setValue(product)
    this.formDetail.patchValue(product)
  
  }
}
