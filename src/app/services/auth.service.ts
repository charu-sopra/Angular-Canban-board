import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(
    private http: HttpClient,
    private router: Router

  ) {}


  login(email: string, password: string) {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email: email,
        password: password
      }
    );
  }

 logout(): void {
    console.log('LOGOUT CALLED');

    sessionStorage.removeItem('token');

    console.log('Token after removal:', sessionStorage.getItem('token'));

    this.router.navigate(['/login']);
}

  isAuthenticated(): boolean {
  const token = sessionStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const currentTime = Math.floor(Date.now() / 1000);

      return payload.exp > currentTime;
    } catch (error) {
      return false;
    }
  }
}