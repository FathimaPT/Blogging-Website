import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { Router } from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService {
  private baseUrl='http://localhost:3000/';

  constructor(private http:HttpClient,private router:Router) { }
  
  isLoggedIn(){
    return this.http.get(this.baseUrl + 'me').pipe(
      map((res:any)=>{
        
        return true
        }),
          catchError((err)=>{
        
          return of(this.router.createUrlTree(['/login']))
        
      })
    )
  }
}
