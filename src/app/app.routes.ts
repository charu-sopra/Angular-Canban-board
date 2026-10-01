import { Routes } from '@angular/router';
import { LoginTemp } from './login-temp/login-temp';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Kanban } from './kanban/kanban';
import { Ticket } from './create-ticket/create-ticket';

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
        {
            path: 'create-ticket',
            component: Ticket
        }
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
    path: 'home',
    component: Home
    },
    {
    path: 'create-ticket',
    component: Ticket
  }
];
