import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';


@Component({
  selector: 'app-home',
  imports: [RouterModule, NavbarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  dumypost = 
  {
    
    image: "images/blog-3.jpg",
   
  }
 posts:any[]=[]
  constructor(private http:AuthService){}
 
ngOnInit(): void {
   this.http.postshow().subscribe(res=>{
    this.posts=res
    
    console.log(res)
    

  })
  
}
}
