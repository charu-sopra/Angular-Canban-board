import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './menu.html',
  styleUrl: './menu.scss'
})
export class Menu {

  isOpen = false;

  constructor(private authService: AuthService) {}
  


  toggleMenu(): void {
    this.isOpen = !this.isOpen;
  }

  logout(): void{
    this.authService.logout();
  }

}