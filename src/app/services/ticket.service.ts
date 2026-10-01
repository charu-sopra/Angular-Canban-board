import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { TicketRequest } from '../model/ticket.model';

@Service()
export class TicketService {
    private http = inject(HttpClient);
    apiUrl = "http://localhost:8080/ticket";

    createTicket(ticket: TicketRequest){
        return this.http.post(
            this.apiUrl,
            ticket
        );
    }

}
