import { Routes } from '@angular/router';
import { LoginTemp } from './login-temp/login-temp';
import { Signup } from './signup/signup';
import { Home } from './home/home';
import { Dashboard } from './dashboard/dashboard';
import { Kanban } from './kanban/kanban';
import { Calendar } from './calendar/calendar';
import { Profile } from './profile/profile';
import { authGuard } from './guards/auth-guard';
import { MainScreen } from './main-screen/main-screen';

export const routes: Routes = [
    {
        path: '',
        component: MainScreen
    },
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
            path: 'calendar',
            component: Calendar
        }
    ],
    canActivate: [authGuard]

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
        component: Profile,
        canActivate: [authGuard]
    }
   
];
