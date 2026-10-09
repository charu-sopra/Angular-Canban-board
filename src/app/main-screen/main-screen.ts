import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  imports: [MatIconModule, RouterLink],
  selector: 'app-main-screen',
  styleUrl: './main-screen.scss',
  templateUrl: './main-screen.html',
})
export class MainScreen {}
