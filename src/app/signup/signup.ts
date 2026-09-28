import { Component, inject } from '@angular/core';
import { FormControl,FormGroup,  FormsModule,  ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../services/user-service';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatStepperModule } from '@angular/material/stepper';


interface Role {
  value: string;
  viewValue: string;
} 
@Component({
  imports: [MatStepperModule, MatIconModule, MatFormFieldModule, MatSelectModule, FormsModule , ReactiveFormsModule, MatButtonModule,  MatInputModule ],
  selector: 'app-signup',
  styleUrl: './signup.scss',
  templateUrl: './signup.html',
})
export class Signup {

  hidePassword = true; 
  hideConfirmPassword = true;

roles: Role[] = [
  { value: 'SUPERUSER', viewValue: 'SUPER USER' },
  { value: 'ANALYSER', viewValue: 'ANALYSER' },
  { value: 'APPROVER', viewValue: 'APPROVER' },
  { value: 'GUEST', viewValue: 'GUEST' }
];

  private userService = inject(UserService);

  signUpForm = new FormGroup({

    employeeId: new FormControl('', [Validators.required]),

    firstName: new FormControl('', [Validators.required]),

    middleName: new FormControl(''), 
    
    lastName: new FormControl('', [Validators.required]),

    phoneNo: new FormControl('', [Validators.required,
                                  Validators.pattern('^[6-9][0-9]{9}$')]),

    email: new FormControl('', [Validators.required,
                                Validators.email,
                                Validators.pattern('^[A-Za-z0-9._%+-]+@soprasteria\\.com$')]),

    designation: new FormControl('', [Validators.required]),

    userRole: new FormControl('', [Validators.required]),

    password: new FormControl('', [Validators.required,
                                  Validators.minLength(12)]),

    confirmPassword: new FormControl('', [Validators.required])
  });

  createUser() {
    const formData = this.signUpForm.value;
    const request = this.userService.createUser(formData);
    request.subscribe((response) => {console.log('Signup successful:', response);
  });

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
