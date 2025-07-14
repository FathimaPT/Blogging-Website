import { Component, Inject, inject } from '@angular/core';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AuthService } from '../../service/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-details',
  imports: [NavbarComponent,CommonModule,ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent {
  private router=inject(Router)
  constructor(private http:AuthService){}
  postForm = new FormGroup({
    title: new FormControl('', [Validators.required]),
    content: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  onSubmit(){
    if(!this.postForm.invalid){
      this.http.postend(this.postForm.value).subscribe({
        next:(value)=>{
          console.log(value)
          this.router.navigate(['/blogshow'])
         
        },

        error:(err) => {
          if(err.status === 400){
            alert("error in creating post")
            this.router.navigate(['/login'])
          }
        }
        })
      }
         
    }


  }


