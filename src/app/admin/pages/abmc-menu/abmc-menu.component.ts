import { Component, OnInit } from '@angular/core';
import { AbmcMenuService } from '../../services/abmc-menu.service';
import { Product, ProductList, ProductMenu } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { response } from 'express';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, of, switchMap } from 'rxjs';

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
  formHead: FormGroup = this.formBuilder.group({
    fecha: ['', [Validators.required]],
    observacion: ['']
  });

  //para agregar productos al array
  formDetail: FormGroup = this.formBuilder.group({
    idproducto: ['', [Validators.required]],
    nombre:[''],
    observacion: ['']
  });

  //idProductSelected!:number;
  action='Create';

  //PARA MODIFICACION DE MENU
  idCabecera: number | null = null;

  constructor(
    private serviceMenu: AbmcMenuService,
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute
    ){}

    
  ngOnInit(): void {
    // Utilizamos forkJoin para ejecutar ambos observables simultáneamente
    forkJoin([
      this.activatedRoute.params.pipe(
        switchMap((params: Params) => {
          this.idCabecera = params['idCabecera'] ? params['idCabecera'] : null;
          console.log(this.idCabecera)
          if (this.idCabecera !== null) {
            // Si hay un ID en la URL, realizamos la petición HTTP utilizando ese ID
            return this.serviceMenu.getMenuSelected(this.idCabecera);
          } else {
            // Si no hay ID en la URL, retornamos un observable vacío
            return of(null);
          }
        })
      ),
      this.serviceMenu.productList()
    ]).subscribe((data:any) => {//[menuSelected, productListResponse]: [any, ProductList]
      // console.log(menuSelected)
      console.log(data)
      // console.log(productListResponse.products)
      
      // this.products = productListResponse.products;
      
    });
  }

  // ngOnInit(){

  //   this.activatedRoute.params.pipe(
  //     switchMap((params:Params)=>{
  //       this.idCabecera = params['idCabecera'] ? +params['idCabecera'] : null;

  //       if (this.idCabecera !== null) {
  //         // Si hay un ID en la URL, realizamos la petición HTTP utilizando ese ID
  //         return this.serviceMenu.getMenuSelected(this.idCabecera);
  //       } else {
  //         // Si no hay ID en la URL, retornamos un observable vacío
  //         return of (null);
  //       }
  //     })
  //   )

  //   this.serviceMenu.productList().subscribe({
  //     next:(response: ProductList)=>{
  //       this.products = response.products;
  //     },
  //     error:(error)=>{
  //       console.log(error);
  //     }
  //   })
  // }

  // addProductMenu(){
  //   console.log(this.formDetail.value);
  //   const producto:ProductMenu = this.formDetail.value;
  //   this.productsMenu.push(producto);
  // }

  addProductMenu() {
    
    //para validar campos dehabilitados pq no se incluyen en el formRecepcion.valid
    if(!(this.formDetail.get('idproducto')?.value || this.formDetail.get('nombre')?.value)){
      alert('Seleccione el producto a agregar');
      return;
    }
    const {idproducto, nombre, observacion} = this.formDetail.value;

    if(this.action==='Create'){
      // Agregar el producto al array de productos
      this.productsMenu.push({
        idproducto: idproducto,//puede convertise con parseInt
        nombre: nombre || '',
        observacion: observacion || ''
      });
    }else if(this.action==="Modify"){
      this.productsMenu.forEach((p, i)=>{
        if(p.idproducto===idproducto){
          this.productsMenu[i]={idproducto, nombre,  observacion}
        }
      })
    }

    this.formDetail.reset();
    this.action='Create'; //la accion por defecto es crear, una vez que se guarda la modificacion se puede volver a crear
  }
  

  saveMenu(){
    const {fecha, observacion}=this.formHead.value;
    
    console.log(this.productsMenu);
    console.log(this.formHead.value)

    if(this.productsMenu.length<1){
      alert("Agregue al menos un producto a la lista");
      return;
    }
  
  
    if(fecha=='' || fecha==null){
      alert("Seleccione la fecha del Menu");
      return;
    }

    this.serviceMenu.saveMenu({fecha, observacion, productos: this.productsMenu}).subscribe({
      next:(response)=>{
        console.log(response)
      },
      error:(error)=>{
        console.log(error)
      }
    })


  }

  setProductSelected(product: Product){
    this.productSelected=product;
    //this.formDetail.setValue(product)
    this.formDetail.patchValue(this.productSelected);
    //el nombre de los campos no coincide para el id
    this.formDetail.get('idproducto')?.setValue(this.productSelected.idProducto.toString());
  
  }

  modifyProductMenu(product: ProductMenu){
    this.action="Modify"
    //this.idProductSelected=product.idproducto;
    this.formDetail.setValue(product)
    // console.log(this.idProductSelected);
  }

  remove(idProducto: number){
    this.productsMenu.forEach((p, i) => {
      if(p.idproducto===idProducto){
        this.productsMenu.splice(i, 1);
      }
    });
  }
}
