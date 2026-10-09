import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSessionService {

  private http = inject(HttpClient);

  private apiUrl =
    'http://localhost:8080/api/sessions/active-users/count';

  getActiveUserCount(): Observable<number> {
    return this.http.get<number>(this.apiUrl);
  }
}
