import { Component, Input } from '@angular/core';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  //TODO: falta la parte de autenticacion
  //como cerrar sesion

  @Input() menuItems: MenuItem[] = [];
} 
