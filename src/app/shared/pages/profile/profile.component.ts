import { Component, OnInit } from '@angular/core';
import { response } from 'express';
import { Profile, ResponseProfile } from 'src/app/authentication/models/login.model';
import { LoginService } from 'src/app/authentication/services/login.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  usuario!: Profile;

  //TODO: falta implementar en el backend
  // apiUrl:string=`${environment.API_URL}/uploads/usuarios/${this.usuario.idUsuario}`;

  constructor(
    private serviceAuth: LoginService
  ){}

  ngOnInit(): void {
    this.serviceAuth.getProfile().subscribe({
      next:(response:ResponseProfile)=>{
        this.usuario=response.usuario;
        console.log(this.usuario)
      },
      error: (error)=>{
        console.log(error);
      }
    })
  }

}
