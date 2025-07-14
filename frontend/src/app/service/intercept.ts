import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, handler: HttpHandler): Observable<HttpEvent<any>> {
    const token =localStorage.getItem('token')
    let headers=req.headers
    headers=headers.set('Content-Type','application/json')
    if(token){
        headers=headers.set('Authorization',`Bearer ${token}`)
    }
    const authRequ = req.clone({headers})
    return handler.handle(authRequ)  
  }
}
