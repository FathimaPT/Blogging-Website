import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormComponent } from '../form/form.component';
import { NavbarComponent } from '../../navbar/navbar.component';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit',
  standalone:true,
  imports: [CommonModule,ReactiveFormsModule,NavbarComponent,FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css'
})
export class EditComponent implements OnInit{
  
  postid:string=''
  constructor(private http:AuthService,private route:ActivatedRoute,private router:Router){}
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  ngOnInit() {
    this.postid=this.route.snapshot.paramMap.get('id') || ''
    this.http.details(this.postid).subscribe(res=>{
      this.postForm.patchValue({
        title: res.title,
        content: res.content,
        category: res.category
      })
    })

    
  }
  onSubmit(){
    if(this.postForm.valid){
      this.http.postupdate(this.postid,this.postForm.value).subscribe(res=>{
        if(res.message=="can't edit  this post"){
          alert("can't edit  this post")
        }
        if(res.message=="blog updated")
        alert("blog updated")
        this.router.navigate(['/blogshow'])
        console.log(res)
      })
    }

}
}
  


