import { Component, OnInit } from '@angular/core';
import { AbmcMenuService } from '../../services/abmc-menu.service';
import { Product, ProductList, ProductMenu } from '../../models/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { forkJoin, of, switchMap, tap } from 'rxjs';

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


    //PROBLEMAS CON EL FORKJOIN
    /*
  ngOnInit(): void {
    // Utilizamos forkJoin para ejecutar ambos observables simultáneamente
    forkJoin([
      this.activatedRoute.params.pipe(
        switchMap((params: Params) => {
          this.idCabecera = params['idCabecera'] ? params['idCabecera'] : null;
          console.log("Esto es el id de cabecera", this.idCabecera)
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
      console.log("Esto es la data", data)
      // console.log(productListResponse.products)
      
      // this.products = productListResponse.products;
      
    });
  }
  */


  //PROBLEMAS CON EL FORKJOIN
  /*
  ngOnInit(){

     const data = this.activatedRoute.params.pipe(
       switchMap((params:Params)=>{
         this.idCabecera = params['idCabecera'] ? +params['idCabecera'] : null;

         if (this.idCabecera !== null) {
           // Si hay un ID en la URL, realizamos la petición HTTP utilizando ese ID
           return this.serviceMenu.getMenuSelected(this.idCabecera);
         } else {
           // Si no hay ID en la URL, retornamos un observable vacío
           return of (null);
         }
       })
     );

      const products = this.serviceMenu.productList();

      forkJoin([
        data,
        products
      ]).subscribe({
        next:(response)=>{
          console.log("response", response)
        },
        error:(error)=>{
          console.log(error)
        }
      });
    }
   */

//EN ESTE NO HAY PROBLEMAS CON EL FORKJOIN

    
    ngOnInit(): void {
      
      const data = this.activatedRoute.params.pipe(
        switchMap((params: Params) => {
          this.idCabecera = params['idCabecera'] ? +params['idCabecera'] : null;

          // Creamos una observable para obtener los productos, independientemente de si hay un ID en la URL o no
          const productList$ = this.serviceMenu.productList();

          if (this.idCabecera !== null) {
            // Si hay un ID en la URL, también obtenemos los datos del menú
            const getMenuSelected$ = this.serviceMenu.getMenuSelected(this.idCabecera);

            return forkJoin([getMenuSelected$, productList$]);
          } else {
            // Si no hay ID en la URL, solo obtenemos los productos y el menú se define como null
            return forkJoin([of(null), productList$]);
          }
        })
      );

      data.subscribe({
        next: ([menuData, productData]: [any, any]) => {
          console.log('Menu Data:', menuData);
          console.log('Product Data:', productData);

          this.products=productData.products;
          console.log(this.products);
          if(menuData){
            console.log("Tiene datos para el formulario")
            this.productsMenu = menuData.productos;
            this.formHead.patchValue({
              fecha:menuData.fecha,
              observacion: menuData.observacion
            })
          }
        },
        error: error => {
          console.error(error);
        }
      });
    }

    

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

    if(this.idCabecera){//modificar un menu
      this.serviceMenu.modifyMenu(this.idCabecera, {fecha, observacion, productos:this.productsMenu}).subscribe({
        next:(response:any)=>{
          console.log(response)
        },
        error:(error)=>{
          console.log(error)
        }
      });
    }else{//guardar un nuevo menu
      this.serviceMenu.saveMenu({fecha, observacion, productos: this.productsMenu}).subscribe({
        next:(response)=>{
          console.log(response)
        },
        error:(error)=>{
          console.log(error)
        }
      });
    }

    //se podria crear un metodo para limpiar
    this.formHead.reset();
    this.formDetail.reset();
    this.productsMenu=[];
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
