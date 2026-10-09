import { Component, DestroyRef, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from './header/header';
import { Footer } from './footer/footer';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [ RouterOutlet, Header, Footer ],
  selector: 'app-root',
  styleUrl: './app.scss',
  templateUrl: './app.html',
})
export class App {
  protected readonly title = signal('angular-app');
  protected readonly isLandingPage = signal(false);
  private readonly destroyRef = inject(DestroyRef);

  constructor(router: Router) {
    this.isLandingPage.set(this.isLandingRoute(router.url));
    router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe((event) => this.isLandingPage.set(this.isLandingRoute(event.urlAfterRedirects)));
  }

  private isLandingRoute(url: string): boolean {
    return url.split(/[?#]/, 1)[0] === '/';
  }
}
