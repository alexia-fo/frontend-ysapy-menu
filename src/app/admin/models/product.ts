import { Time } from "@angular/common"

export interface Product {
    idProducto: number,
    nombre:string,
    precio: number
}

export interface ProductList{
    total:number
    products: Product[],
}

export interface ProductMenu{
    idproducto: number,
    nombre:string,
    observacion:string
}

export interface CMenuSemanal{
    idcabeceramenu: number,
    fecha: Date,
    nrosemana: number,
    nrodia: number,
    observacion: string,
    fechaAlta: Time
}

export interface resCMenuSemanal{
    total:number,
    cabeceras: CMenuSemanal[]
}

export interface Menu{
    fecha: Date,
    observacion: string,
    productos: ProductMenu[];
}