import { inject, Service } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfile } from '../model/user.model';
// import { SignUpRequest } from '../model/signup-request.model';

@Service()
export class UserService {
 
  private http = inject(HttpClient);
  userRole = '';
  
  apiUrl = 'http://localhost:8080/signup';
  

  createUser(userData: any) {
    console.log('USER SERVICE: createUser called');
    console.log('FORM DATA:', userData);
    return this.http.post(this.apiUrl,userData,{ observe: 'response' }); 
  }
  getProfile() {
    return this.http.get<UserProfile>(
      'http://localhost:8080/profile'
    );
  }

  getAllUsernames() {
  return this.http.get<string[]>('http://localhost:8080/usernames');
}
}

