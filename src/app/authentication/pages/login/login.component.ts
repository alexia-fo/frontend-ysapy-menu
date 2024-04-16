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


  //todo: para google sign in
  //https://developers.google.com/identity/gsi/web/guides/handle-credential-responses-js-functions?hl=es-419
  //handleCredentialResponse(response:any) {
    //? google token - ID_TOKEN
    //console.log(response.credential);
  //}

    // decodeJwtResponse() is a custom function defined by you
    // to decode the credential response.



     //const responsePayload = decodeJwtResponse(response.credential);
    //console.log("ID: " + responsePayload.sub);
    //console.log('Full Name: ' + responsePayload.name);
    //console.log('Given Name: ' + responsePayload.given_name);
    //console.log('Family Name: ' + responsePayload.family_name);
    //console.log("Image URL: " + responsePayload.picture);
    //console.log("Email: " + responsePayload.email);
}
