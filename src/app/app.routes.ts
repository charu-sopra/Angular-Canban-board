import { Routes } from '@angular/router';
import { LoginTemp } from './login-temp/login-temp';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Kanban } from './kanban/kanban';
import { Profile } from './profile/profile';

export const routes: Routes = [
    {
    path: 'home',
    component: Home,
    children: [
        {
            path: '',
            component: Kanban
        },
        
        {
            path: 'dashboard',
            component: Dashboard
        },

    ]
    },
    
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
        path: 'profile',
        component: Profile
    }
   
];
