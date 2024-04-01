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
  private _usuario!: Profile;

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

}
