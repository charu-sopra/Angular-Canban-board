import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TicketPageResponse, TicketRequest, TicketResponse } from '../model/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class TicketService {
    private http = inject(HttpClient);
    apiUrl = "http://localhost:8080/tickets";
    private readonly searchResultsSubject = new BehaviorSubject<TicketResponse[] | null>(null);
    readonly searchResults$ = this.searchResultsSubject.asObservable();

    setSearchResults(tickets: TicketResponse[] | null): void {
      this.searchResultsSubject.next(tickets);
    }

    // Create
  public submitTicket(ticket: TicketRequest) {
    return this.http.post(this.apiUrl,ticket);
  }

  public getMyTickets(page: number = 0, size: number = 10) {
  return this.http.get<any>(
    `http://localhost:8080/tickets/my-tickets?page=${page}&size=${size}`
  );
}

  // Get all
  public getTickets() {  
    return this.http.get<TicketPageResponse>(this.apiUrl);
  }

  // Search tickets
searchTickets(
  query: string,
  page: number = 0,
  size: number = 10
) {
  return this.http.get<TicketPageResponse>(
    `${this.apiUrl}/search`,
    {
      params: { query, page, size}
    }
  );
}

  // Get one
  getTicketById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);}

  // Update
  updateTicket(id: number, ticket: TicketRequest) {
    return this.http.put(`${this.apiUrl}/${id}`,ticket);
  }

  // Delete
  deleteTicket(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
