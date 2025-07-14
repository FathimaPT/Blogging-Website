import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, NavbarComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  constructor(private http:AuthService,private router:Router){}
  
   SignForm = new FormGroup({
     username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    confirmpassword: new FormControl('',Validators.required)
  });
   onsubmit(){
    if(!this.SignForm.invalid){
      this.http.register(this.SignForm.value).subscribe({
        next :(value) => {
        localStorage.setItem('token',value.token)
         this.router.navigate(['/'])

        }, error:(err) => {
          if(err.status === 409){
            alert("user already exist")
            this.router.navigate(['/login'])
          }
        }
        
      }
    )
     
    }
    
    
    
      
    }
  ngOnInit() {
   

    
    
  }

}
