import { Component, OnInit } from '@angular/core';
import { routes } from '../../app.routes';
import { ActivatedRoute, Route, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone:true,
  imports: [RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  dumypost = 
  {
    
    image: "images/blog-3.jpg",
   
  }
  posts:any
constructor(private http:AuthService,private router:Router,private route:ActivatedRoute){}

ngOnInit(): void {
  const postid = this.route.snapshot.paramMap.get('id')
  if(postid){
    this.http.details(postid).subscribe(res=>{
      this.posts=res
    })
  }
   
  
}
}
