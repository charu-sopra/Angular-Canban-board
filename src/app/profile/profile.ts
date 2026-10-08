import { Component, OnInit, signal } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from '../services/user-service';
import { UserProfile } from '../model/user.model';
import { MachineDetails } from '../model/machine-details.model';
import { MachineService } from '../services/machine.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  user = signal<UserProfile | null>(null);
  machine = signal<MachineDetails | null>(null);
  loading = signal(true);
  errorMessage = signal<string | null>(null);

  constructor(private userService: UserService, private machineService: MachineService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.user.set(response);
        this.loading.set(false);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Failed to load profile', error);
        this.errorMessage.set(error.status
          ? `Could not load your profile (HTTP ${error.status} ${error.statusText}).`
          : 'Could not reach the profile service. Check that the backend is running.');
        this.loading.set(false);
      }
    });

        this.machineService.getMachineDetails().subscribe({
      next: (response) => {
        console.log('MACHINE DETAILS:', response);

        this.machine.set(response);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Failed to load machine details:', error);
        this.loading.set(false);
      }
    });

  }
}