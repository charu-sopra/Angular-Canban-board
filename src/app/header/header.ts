import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';
import { TicketResponse } from '../model/ticket.model';
import { TicketService } from '../services/ticket.service';

@Component({
  imports: [MatButtonModule, RouterLink],
  selector: 'app-header',
  styleUrl: './header.scss',
  templateUrl: './header.html',
})
export class Header {

  searchQuery = '';

  tickets: TicketResponse[] = [];

  isLoadingTickets = false;

  searchError = false;

  constructor(private ticketService: TicketService) {}

  onSearchInput(event: Event): void {

    this.searchQuery =
      (event.target as HTMLInputElement).value.trim();

    this.searchError = false;

    if (!this.searchQuery) {
      this.tickets = [];
      return;
    }

    this.searchTickets();
  }

  private searchTickets(): void {

    this.isLoadingTickets = true;
    this.searchError = false;

    this.ticketService
      .searchTickets(this.searchQuery, 0, 10)
      .subscribe({

        next: (response) => {

          this.tickets = response.content;

          this.isLoadingTickets = false;
        },

        error: () => {

          this.isLoadingTickets = false;
          this.searchError = true;
          this.tickets = [];
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
    this.tickets = [];
    this.searchError = false;
  }
}