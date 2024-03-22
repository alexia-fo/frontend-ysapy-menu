export interface ResponseLogin{
    token:string
}

// PROFILE
export interface Profile{//para no tener que crear dos modelos uno para usuario y otro para perfil agregue todos los datos a perfil
    idUsuario: string;
    nombre: string; 
    nusuario: string; 
    correo: string; 
    //contra: string; CREO QUE ES INNECESARIO
    //activo: boolean,
    img: string,
    google: boolean,
    //idSucursal:string; SOLO PARA FUNCIONARIOS
    idRol: string, //SI ES NECESARIO PQ EVALUA QUE SEAN CLIENTES
    //turno:string; CREO QUE ES INNECESARIO PARA LOS CLIENTES
    //createdAt: Date,
    //updatedAt: Date
    //add para pedidos
    //categoria:string SOLO SE UTILIZA PARA CLASIFICAR FUNCIONARIOS
    Rol:datosRol  //ES NECESARIO PQ EVALUA QUE SEAN CLIENTES
    //Sucursal: datosSucursal CREO QUE ES INNECESARIO PARA LOS CLIENTES
}

export interface datosRol{
    rol:string;
}

//RESPUSTA DE GET PROFILE
export interface ResponseProfile{
    usuario: Profile
}