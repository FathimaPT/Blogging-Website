import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AuthService } from '../../service/auth.service';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-blogshow',
  standalone:true,
  imports: [NavbarComponent,RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './blogshow.component.html',
  styleUrl: './blogshow.component.css'
})
export class BlogshowComponent implements OnInit{
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


