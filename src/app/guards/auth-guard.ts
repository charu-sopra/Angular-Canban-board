import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = sessionStorage.getItem('token'); 

  if (token) {
    return true; // Token exists, let them pass
  } else {
    return router.createUrlTree(['/login']); // No token, send to login
  }
};
