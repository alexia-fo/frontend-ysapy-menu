import { Component, Input } from '@angular/core';
import { MenuItem } from '../../models/menu.model';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.css']
})
export class MenubarComponent {
  //TODO: falta la parte de autenticacion
  //como cerrar sesion

  @Input() menuItems: MenuItem[] = [];
}
