declare var google:any;

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, switchMap, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Profile, ResponseLogin, ResponseProfile } from '../models/login.model';
import { TokenService } from './token.service';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private apiUrl = `${environment.API_URL}/auth`;
  //TODO: falta el manejo de errores
  private _usuario!: Profile;//????creo que recarga con el guardian

  constructor(
    private http: HttpClient,
    private serviceToken: TokenService
  ) { }

  login(correo: string, contra: string):Observable<ResponseLogin>{
    return this.http.post<ResponseLogin>(`${this.apiUrl}/login`, {correo, contra})
    .pipe(
      tap((response: ResponseLogin)=>{
        this.serviceToken.saveToken(response.token);
      })
    );
  }

  getProfile():Observable<ResponseProfile>{
    return this.http.get<ResponseProfile>(`${this.apiUrl}/getProfile`)
    .pipe(
      tap((response:ResponseProfile)=>{
        this._usuario= response.usuario;
      })
    );
  }

  loginAndProfile(correo: string, contra: string):Observable<ResponseProfile>{  
    return this.login(correo, contra)
    .pipe(
      switchMap(() => this.getProfile())
    );   
  }

  signOff(){
    this.serviceToken.removeToken();
  }

  get getUser(){
    return this._usuario;
  }

  //TODO: probando google sign-in
  signOut(){
    google.accounts.id.disableAutoSelect();//you yube

    //udemy
    google.accounts.id.revoke(localStorage.getItem(this._usuario.correo), (done:any)=>{
      localStorage.clear();
      // localStorage.reload();
    })
  }

  loginGoogle(id_token:string):Observable<any>{
    console.log("loginserv ", id_token)
    return this.http.post<any>(`${this.apiUrl}/google`, {id_token})
    .pipe(
      tap((response)=>{
        // this.serviceToken.saveToken(response.token);
        console.log("tap ", response)
      })
    );
  }


}
