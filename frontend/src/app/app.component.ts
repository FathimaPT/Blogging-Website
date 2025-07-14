import { Component } from '@angular/core';
import { Router, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CommonModule } from '@angular/common';
import { routes } from './app.routes';
import { FormComponent } from './pages/form/form.component';
import { DetailsComponent } from './pages/details/details.component';
import { HomeComponent } from './pages/home/home.component';
import { BlogshowComponent } from './pages/blogshow/blogshow.component';
import { AuthService } from './service/auth.service';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { MyblogComponent } from './pages/myblog/myblog.component';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, NavbarComponent,LoginComponent,RegisterComponent,CommonModule,FormComponent,DetailsComponent,RouterModule,BlogshowComponent,MyblogComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
