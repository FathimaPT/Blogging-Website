import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { NavbarComponent } from "../../navbar/navbar.component";
import { AuthService } from '../../service/auth.service';
import { routes } from '../../app.routes';



@Component({
  selector: 'app-login',
  standalone: true, 
  imports: [CommonModule, RouterModule, ReactiveFormsModule, NavbarComponent],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  
constructor(private http:AuthService,private router:Router){}
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });
  onsubmit(){
    if(!this.loginForm.invalid){
      this.http.login(this.loginForm.value).subscribe({
        next:(value)=>{
        localStorage.setItem('token',value.token)
        console.log(value)
        this.router.navigate(['/'])
        },
        error:(err) => {
          if(err.status === 404){
            alert("user not found")
            this.router.navigate(['/register'])
          }
        }
        })
    }

   
  }

  ngOnInit(): void {}

 
}
