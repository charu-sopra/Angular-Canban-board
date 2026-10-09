import { Component, inject, OnInit } from '@angular/core';
import { UserSessionService } from '../services/user.session.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  private userSessionService = inject(UserSessionService);

  activeUserCount = 0;

  ngOnInit(): void {
    this.loadActiveUserCount();
  }

  loadActiveUserCount(): void {
    this.userSessionService.getActiveUserCount().subscribe({
      next: (count) => {
        this.activeUserCount = count;
      },
      error: (error) => {
        console.error('Failed to load active user count', error);
      }
    });
  }
}