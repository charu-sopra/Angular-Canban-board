import { Component, inject } from '@angular/core';
import { FormControl,FormGroup,  FormsModule,  ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user-service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';
import { RouterLink, RouterOutlet } from '@angular/router';
import { LoggerService } from '../services/logger.service';import { Router } from '@angular/router';



interface Role {
  value: string;
  viewValue: string;
} 
@Component({
  imports: [ MatStepperModule, MatIconModule, MatFormFieldModule, MatSelectModule, FormsModule , ReactiveFormsModule, MatButtonModule,  MatInputModule ],
  selector: 'app-signup',
  styleUrl: './signup.scss',
  templateUrl: './signup.html',
})
export class Signup {

//dynamic errors
  messageList = {
  "employeeId.required": "Employee ID is required",
  "firstName.required": "First name should not be empty",
  "lastName.required": "Last name is required",
  "phoneNo.invalid": "Please enter a valid 10-digit phone number",
  "email.invalid": "Please enter a valid company email address",
  "designation.required": "Designation is required",
  "userRole.required": "Please select a role",
  "password.invalid": "Password must be at least 12 characters long",
  "confirmPassword.required": "Please confirm your password"
};

  hidePassword = true; 
  hideConfirmPassword = true;
  isSubmitting = false;
  successMessage = '';
  redirectCountdown = 3;

    roles: Role[] = [
  { value: 'SUPERUSER', viewValue: 'SUPER USER' },
  { value: 'ANALYSER', viewValue: 'ANALYSER' },
  { value: 'APPROVER', viewValue: 'APPROVER' },
  { value: 'GUEST', viewValue: 'GUEST' }
];
private logger = inject(LoggerService);
  constructor(
  private userService: UserService,
  private router: Router,
) {}

  signUpForm = new FormGroup({

    employeeId: new FormControl('', [Validators.required]),

    firstName: new FormControl('', [Validators.required]),

    middleName: new FormControl(''), 
    
    lastName: new FormControl('', [Validators.required]),

    phoneNo: new FormControl('', [Validators.required, Validators.pattern('^[6-9][0-9]{9}$')]),

    email: new FormControl('', [Validators.required, Validators.email,
                                Validators.pattern('^[A-Za-z0-9._%+-]+@soprasteria\\.com$')]),

    designation: new FormControl('', [Validators.required]),

    userRole: new FormControl('', [Validators.required]),

    password: new FormControl('', [Validators.required,
                                  Validators.minLength(12)]),

    confirmPassword: new FormControl('', [Validators.required])
  });
  formData: any;


  //method to encode into base64
    encodePassword(password: string): string {
    const bytes = new TextEncoder().encode(password);

    let binary = '';

    for (const byte of bytes) {
      binary += String.fromCharCode(byte);
    }

    return btoa(binary);
  }


  //after user calls to create--->
createUser() {
  // Check if form is valid
  if (this.signUpForm.invalid || this.isSubmitting) {
    this.signUpForm.markAllAsTouched();
    return;
  }

  this.isSubmitting = true;

  // Get form data
  const formData = this.signUpForm.getRawValue();

    if (!formData.password) {
      //console.error('Password is missing');
      this.logger.error('Password is missing');
      this.isSubmitting = false;
      return;
    }

    //console.log('FORM DATA:', formData);
    this.logger.info('Signup form submitted');
   // console.log('PASSWORD:', formData.password);

  // Encode password
  const encodedPassword = this.encodePassword(formData.password);

  console.log('ENCODED PASSWORD:', encodedPassword);

  formData.password = encodedPassword;

  // Send request to backend
  const request = this.userService.createUser(formData);
  request.subscribe({

    next: (response) => {

          console.log('User created successfully:', response);
          this.successMessage = 'User has been successfully created.';
          console.log(this.successMessage);
          this.isSubmitting = false;
          this.redirectCountdown = 3;
          const countdown = setInterval(() => {
            this.redirectCountdown--;
            if (this.redirectCountdown === 0) {
              clearInterval(countdown);

              this.router.navigate(['/login']);
            }

          }, 1000);
        },

    // Runs when HTTP request fails
    error: (error) => {

      console.error('Signup failed:', error);

      this.isSubmitting = false;
    }
  });
}

resetForm(): void {
  this.signUpForm.reset();

  this.isSubmitting = false;
  this.successMessage = '';
}
get employeeId() {
  return this.signUpForm.controls.employeeId;
}

get firstName() {
  return this.signUpForm.controls.firstName;
}

get middleName() {
  return this.signUpForm.controls.middleName;
}

get lastName() {
  return this.signUpForm.controls.lastName;
}

get phoneNo() {
  return this.signUpForm.controls.phoneNo;
}

get email() {
  return this.signUpForm.controls.email;
}

get designation() {
  return this.signUpForm.controls.designation;
}

get userRole() {
  return this.signUpForm.controls.userRole;
}

get password() {
  return this.signUpForm.controls.password;
}

get confirmPassword() {
  return this.signUpForm.controls.confirmPassword;
}

}


