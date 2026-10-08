import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MachineDetails } from '../model/machine-details.model';

@Injectable({
  providedIn: 'root'
})
export class MachineService {

  private http = inject(HttpClient);

  private apiUrl = 'http://localhost:8080/machine';

  getMachineDetails() {
    return this.http.get<MachineDetails>(
      `${this.apiUrl}/details`
    );
  }
}