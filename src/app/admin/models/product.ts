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