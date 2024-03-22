import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ResponseProfile } from '../../models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  
  form: FormGroup = this.formBuilder.group({
    correo: ['', Validators.required],
    contra: ['', Validators.required]
  });

  constructor(
    private serviceLG: LoginService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
  }

  login(){
    const {correo, contra} = this.form.value;

    this.serviceLG.loginAndProfile(correo, contra).subscribe({
      next: (response: ResponseProfile)=>{
        console.log(response.usuario);
      },
      error: (error)=>{
        console.log(error);//TODO: falta la manipulacion de errores
      }
    })
  }

}
