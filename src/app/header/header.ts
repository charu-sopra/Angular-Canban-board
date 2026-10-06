import { ChangeDetectorRef, Component, DestroyRef, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import { filter } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { TicketResponse } from '../model/ticket.model';
import { TicketService } from '../services/ticket.service';

@Component({
  imports: [MatButtonModule, MatIconModule, RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {

  searchQuery = '';

  tickets: TicketResponse[] = [];

  isLoadingTickets = false;

  searchError = false;
  hasSubmittedSearch = false;
  isAuthPage = false;
  private searchRequestId = 0;
  private destroyRef = inject(DestroyRef);

  constructor(
    private ticketService: TicketService,
    private changeDetector: ChangeDetectorRef,
    private router: Router
  ) {
    this.updateAuthPage(this.router.url);

    this.router.events
      .pipe(
        filter((event): event is NavigationEnd => event instanceof NavigationEnd),
        takeUntilDestroyed(this.destroyRef)
      )
      .subscribe((event) => {
        this.updateAuthPage(event.urlAfterRedirects);
        this.changeDetector.markForCheck();
      });
  }

  private updateAuthPage(url: string): void {
    const path = url.split(/[?#]/, 1)[0];
    this.isAuthPage = path === '/login' || path === '/signup';

    if (this.isAuthPage && this.searchQuery) {
      this.clearSearch();
    }
  }

  onSearchInput(event: Event): void {

    this.searchQuery =
      (event.target as HTMLInputElement).value.trim();

    this.searchRequestId++;
    this.isLoadingTickets = false;
    this.searchError = false;
    this.hasSubmittedSearch = false;
    this.tickets = [];

    if (!this.searchQuery) {
      this.ticketService.setSearchResults(null);
    }
  }

  submitSearch(event: Event): void {
    event.preventDefault();

    if (!this.searchQuery) {
      this.clearSearch();
      return;
    }

    this.hasSubmittedSearch = true;
    this.searchTickets();
  }

  private searchTickets(): void {

    const requestId = ++this.searchRequestId;
    this.isLoadingTickets = true;
    this.searchError = false;
    this.changeDetector.markForCheck();

    this.ticketService
      .searchTickets(this.searchQuery, 0, 10)
      .subscribe({

        next: (response) => {
          if (requestId !== this.searchRequestId) {
            return;
          }

          this.tickets = response.content;
          this.ticketService.setSearchResults(response.content);

          this.isLoadingTickets = false;
          this.changeDetector.markForCheck();
        },

        error: () => {
          if (requestId !== this.searchRequestId) {
            return;
          }

          this.isLoadingTickets = false;
          this.searchError = true;
          this.tickets = [];
          this.ticketService.setSearchResults([]);
          this.changeDetector.markForCheck();
        }
      });
  }

  retrySearch(): void {

    if (!this.searchQuery) {
      return;
    }

    this.searchTickets();
  }

  clearSearch(): void {

    this.searchQuery = '';
    this.searchRequestId++;
    this.tickets = [];
    this.searchError = false;
    this.isLoadingTickets = false;
    this.hasSubmittedSearch = false;
    this.ticketService.setSearchResults(null);
    this.changeDetector.markForCheck();
  }
}