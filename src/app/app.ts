import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Signup } from './signup/signup';
import { Header } from './header/header';
import { Footer } from './footer/footer';

@Component({
  imports: [RouterOutlet, Signup, Header, Footer ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-app');


}
