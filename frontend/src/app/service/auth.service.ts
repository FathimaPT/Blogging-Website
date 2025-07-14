import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl='http://localhost:3000/';

  constructor(private http:HttpClient) {}
  register(value:any){
    return this.http.post<any>(this.baseUrl +'register',value)
  }
  login(value:any){
    return this.http.post<any>('http://localhost:3000/login',value) 
  }
  postend(value:any){
    return this.http.post<any>('http://localhost:3000/postend',value)
  }
  postshow(){
    return this.http.get<any>('http://localhost:3000/postshow')
  }
  details(postid:string){
    return this.http.get<any>(`http://localhost:3000/form/${postid}`)
  }
  postdelete(postid:string){
    return this.http.delete<any>(`http://localhost:3000/postdelete/${postid}`)
  }
  postupdate(postid:string,value:any){
    return this.http.put<any>(`http://localhost:3000/edit/${postid}`,value
    )
  }
  myblog(){
    return this.http.get<any>('http://localhost:3000/myblogs')
  }
}
