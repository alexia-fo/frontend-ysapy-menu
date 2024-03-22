import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token:string){
    localStorage.setItem('yp_c', token);
  }

  removeToken(){
    localStorage.removeItem('yp_c');
  }

  getToken(){
    const token=localStorage.getItem('yp_c');
    return token;
  }


}
