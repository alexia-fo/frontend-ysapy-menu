import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { TokenService } from "../authentication/services/token.service";
import { Observable } from "rxjs";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private tokenService:TokenService,
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request=this.addToken(request);
    return next.handle(request);
  }

  private addToken(request: HttpRequest<unknown>){
    const token=this.tokenService.getToken() || "";
    
    if(token){
      const authReq=request.clone({
        headers: request.headers.set('x-token', token)
      });
      return authReq;
    }
    return request;
  }
}