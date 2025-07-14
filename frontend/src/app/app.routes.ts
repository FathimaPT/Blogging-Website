import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { FormComponent } from './pages/form/form.component';
import { DetailsComponent } from './pages/details/details.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BlogshowComponent } from './pages/blogshow/blogshow.component';
import { EditComponent } from './pages/edit/edit.component';
import { AuthGuardService } from './service/auth-guard/auth-guard.service';
import { inject } from '@angular/core';
import { MyblogComponent } from './pages/myblog/myblog.component';

export const routes: Routes = [
    {
        path:'',
        component:HomeComponent,
        canActivate:[
            ()=>{
                return inject(AuthGuardService).isLoggedIn();
            }
        ]
    },
    {
        path:'register',
        component:RegisterComponent
    },
    {
        path:'login',
        component:LoginComponent,
        
    },
    {
        path:'form/:id',
        component:FormComponent,
        canActivate:[
            ()=>{
                return inject(AuthGuardService).isLoggedIn();
            }
        ]
    },
    {
        path:'details',
        component:DetailsComponent,
        canActivate:[
            ()=>{
                return inject(AuthGuardService).isLoggedIn();
            }
        ]
    },
    {
        path:'blogshow',
        component:BlogshowComponent,
        canActivate:[
            ()=>{
                return inject(AuthGuardService).isLoggedIn();
            }
        ]
    },
    {
        path:'edit/:id',
        component:EditComponent,
        canActivate:[
            ()=>{
                return inject(AuthGuardService).isLoggedIn();
            }
        ]
    },
    {
        path:'myblog',
        component:MyblogComponent,
        canActivate:[
            ()=>{
                return inject(AuthGuardService).isLoggedIn();
            }
        ]
    }
    
];
