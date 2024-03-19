export interface Product{
    idproducto: number,
    item:number,
    nombre:string,
    precio:number,
    img:string;
    observacion:string
}

export interface ProductsMenuDia{
    fecha:Date,
    observacion:string,
    productos: Product[]
}