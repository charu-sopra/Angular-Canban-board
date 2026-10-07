import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user-service';
import { UserProfile } from '../model/user.model';

@Component({
  selector: 'app-profile',
  standalone: true,
  templateUrl: './profile.html',
  styleUrl: './profile.scss'
})
export class Profile implements OnInit {

  user: UserProfile | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getProfile().subscribe({
      next: (response) => {
        this.user = response;
      },
      error: (error) => {
        console.error('Failed to load profile', error);
      }
    });
  }
}