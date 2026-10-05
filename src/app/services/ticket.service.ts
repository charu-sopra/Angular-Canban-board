import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { TicketPageResponse, TicketRequest, TicketResponse } from '../model/ticket.model';

@Service()
export class TicketService {
    private http = inject(HttpClient);
    apiUrl = "http://localhost:8080/tickets";

    // Create
  createTicket(ticket: TicketRequest) {
    return this.http.post(this.apiUrl,ticket);
  }

  // Get all
  getTickets() {  return this.http.get<TicketPageResponse>(this.apiUrl);
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
      params: {
        query,
        page,
        size
      }
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
