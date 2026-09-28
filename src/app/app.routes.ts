import { Routes } from '@angular/router';
import { LoginTemp } from './login-temp/login-temp';
import { Signup } from './signup/signup';
import { Home } from './home/home';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'signup',
        pathMatch: 'full'
    },
    {
        path: 'signup',
        component: Signup
    },
    {
        path: 'login',
        component: LoginTemp
    },
    {
    path: 'home',
    component: Home
    }
//     },
//     {
//     path: 'create-ticket',
//     component: CreateTicket
//   }
];
