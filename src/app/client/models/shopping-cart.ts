export interface Producto{
    idproducto: number,
    nombre: string,
    precio:number
    cantidad: number
}

export interface Carrito{
    productos: Producto[]
}