import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/authentication/models/login.model';
import { LoginService } from 'src/app/authentication/services/login.service';
import { MenuItem } from 'src/app/utilities/models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{

  usuario!:Profile;

  itemsMenu: MenuItem[]=[];

  constructor(
    private serviceLogin: LoginService
  ){}

  ngOnInit(): void {
    this.usuario=this.serviceLogin.getUser;
    console.log("Usuario del menu: ",this.usuario);

    if(this.usuario.Rol.rol=="ADMINISTRADOR"){

    }else if(this.usuario.Rol.rol=="CLIENTE"){
    
      this.itemsMenu=[
        {
          title:'Menu del día',
          route:'/productList',
          isDropdown:false
        },
        {
          title:'Listado Menu Semanal',
          route:'/productList',
          isDropdown:false
        },
        {
          title:'Listado de Productos',
          route:'/productList',
          isDropdown:false
        },

      ]

    }

    console.log(this.itemsMenu)
  }


}
