import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/auth';

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {

    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email: email,
        password: password
      }
    );
  }
}