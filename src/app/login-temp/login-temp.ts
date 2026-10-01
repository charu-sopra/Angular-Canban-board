// Component = tells Angular that this class is an Angular component
import { Component, signal } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, RouterLink } from '@angular/router';
// These are used to create and manage our login form
import {FormControl,FormGroup,ReactiveFormsModule} from '@angular/forms';
// HttpErrorResponse = gives us information when an HTTP request fails
import { HttpErrorResponse } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

// AuthService = our own service that talks to the Spring Boot login API

@Component({
imports: [
    ReactiveFormsModule,
    RouterLink,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  selector: 'app-login-temp',
  styleUrl: './login-temp.scss',
  templateUrl: './login-temp.html',
})

export class LoginTemp {

    hide = signal(true);
    clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  hidePassword = true;

  loginForm = new FormGroup({
    email: new FormControl<string>(''),
    password: new FormControl<string>('')
  });


  //  DEPENDENCY INJECTION
 
  // Our LoginTemp component needs two things:
  //
  // 1. AuthService
  //    → to communicate with our Spring Boot login API
  //
  // 2. Router
  //    → to move the user to another Angular page
  //
  // Angular creates/provides these objects for us.
  //
  // We don't have to write:
  //
  //     new AuthService()
  //     new Router()
  //
  // Angular's Dependency Injection system handles this.
  //
  // =========================================================

  constructor(

    // AuthService is stored inside this component

    private authService: AuthService,


    // Router is stored inside this component
    // so we can use:this.router.navigate(...)
    private router: Router
  ) {}

  login() {
    const email =this.loginForm.get('email')?.value ?? '';

    const password =this.loginForm.get('password')?.value ?? '';

    console.log('Email entered:', email);

    console.log('Password entered:', password);


    // The component itself does NOT make the HTTP request.
    //
    // Instead:
    //
    // LoginTemp
    //      ↓
    // AuthService
    //      ↓
    // HTTP request
    //      ↓
    // Spring Boot
    //
    // We give the AuthService:
    //
    //     email
    //     password
    //
    // =======================================================

    this.authService.login(email, password).subscribe({


        // next() runs when the HTTP request succeeds.
        // response = whatever Spring Boot sends back.
      
        next: (response) => {

          console.log('Login successful:', response);

          // The backend gives us a token.
          // We store that token in sessionStorage.
          //
          // Later, we can use this token when making
          // protected API requests.
    

          sessionStorage.setItem(
            'token',
            response.token
          );

          // Login was successful.
      
          // "Go to the /home route."

          this.router.navigate(['/home']);

        },

        // 401 → invalid login credentials
        // 403 → access forbidden
        // 404 → endpoint not found
        // 500 → server error
        
        error: (error: HttpErrorResponse) => {

          console.log('Login failed:', error);

        }

      });
  }

  reset() {
    this.loginForm.setValue({
      email: '',
      password: ''
    });

  }

}