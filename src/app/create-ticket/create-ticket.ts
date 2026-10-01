import { Component } from '@angular/core';
import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { TicketService } from '../services/ticket.service';
import { Router } from '@angular/router';
import { TicketRequest } from '../model/ticket.model';

@Component({
  selector: 'app-create-ticket',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
  styleUrl: './create-ticket.scss',
  templateUrl: './create-ticket.html',
})
export class Ticket {

  ticketForm = new FormGroup({

    title: new FormControl('', [Validators.required, Validators.maxLength(150)],),

    description: new FormControl('', [
      Validators.required
    ]),

    ticketPriority: new FormControl('', [
      Validators.required
    ]),

    ticketStatus: new FormControl('OPEN'),

    // createdBy: new FormControl<number | null>(null),

    // updatedBy: new FormControl<number | null>(null)

  });

  constructor(
    private ticketService: TicketService,
    private router: Router
  ) {}


  createTicket() {

    if (this.ticketForm.invalid) {
      this.ticketForm.markAllAsTouched();
      return;
    }
    

    console.log('Ticket:', this.ticketForm.value);

     const ticket: TicketRequest = {
    title: this.ticketForm.value.title ?? '',
    description: this.ticketForm.value.description ?? '',
    ticketPriority: this.ticketForm.value.ticketPriority ?? '',
    ticketStatus: this.ticketForm.value.ticketStatus ?? 'OPEN'
     };


      this.ticketService.createTicket(ticket).subscribe({

        next: (response) => {

          console.log('Ticket created successfully:', response);

          this.router.navigate(['/home']);

        },

        error: (error) => {

          console.error('Failed to create ticket:', error);

        }

      });


  }


  reset() {

    this.ticketForm.reset({
      title: '',
      description: '',
      ticketPriority: '',
      ticketStatus: 'OPEN',
      // createdBy: null,
      // updatedBy: null
    });

  }

}