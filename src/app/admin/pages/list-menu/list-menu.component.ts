import { Component, OnInit } from '@angular/core';
import { AbmcMenuService } from '../../services/abmc-menu.service';
import { response } from 'express';
import { CMenuSemanal } from '../../models/product';
import { error } from 'jquery';

@Component({
  selector: 'app-list-menu',
  templateUrl: './list-menu.component.html',
  styleUrls: ['./list-menu.component.css']
})
export class ListMenuComponent implements OnInit{
  cabeceras: CMenuSemanal[]=[];
  total:number=0;

  constructor(
    private serviceM: AbmcMenuService
  ){}

  ngOnInit(){
    this.serviceM.listMenu().subscribe({
      next:(response)=>{
        this.cabeceras=response.cabeceras;
        this.total=response.total;
      },
      error:(error)=>{
        console.log(error)
      }
    });
  }

}
