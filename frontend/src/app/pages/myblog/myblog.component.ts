import { Component, OnInit } from '@angular/core';
import { NavbarComponent } from '../../navbar/navbar.component';
import { RouterLinkActive, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-myblog',
  standalone:true,
  imports: [NavbarComponent,RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './myblog.component.html',
  styleUrl: './myblog.component.css'
})
export class MyblogComponent implements OnInit{
  constructor(private http:AuthService,private route:Router){}
  dumypost = 
  {
    
    image: "images/blog-3.jpg",
   
  }
  posts:any[]=[]
  ngOnInit(): void {
     this.http.myblog().subscribe(res=>{
      this.posts=res
     })
    
  }
  delete(postid:string){
  this.http.postdelete(postid).subscribe(res=>{
    console.log(res)
 if (res.message === "blog deleted") {
      alert("Post deleted successfully.");
        this.posts = this.posts.filter(post => post._id !== postid);
 
    } else if (res.message === "can't delete this post") {
      alert("You can only delete your own posts.");
    } else {
      alert("Something went wrong. Please try again.");
    }
  });
}

}
