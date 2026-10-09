import '@angular/compiler';
import { ElementRef, signal, viewChild} from '@angular/core';
import {MatAutocompleteModule} from '@angular/material/autocomplete';

import { Component, inject, OnDestroy } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TicketService } from "../services/ticket.service";
import { TicketRequest, TicketResponse } from "../model/ticket.model";
import {ReactiveFormsModule,FormsModule, FormGroup,FormControl,Validators} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogRef} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LoggerService } from "../services/logger.service";
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UserService } from '../services/user-service';

@Component({
  selector: 'app-create-ticket-dialog',
  standalone: true,

  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogTitle,    FormsModule,     MatAutocompleteModule,
    MatDialogContent, MatDialogActions
  ],
  templateUrl: './create-ticket-dialog.html',
  styleUrl: './create-ticket-dialog.scss'
})



export class CreateTicketDialogComponent {

  //assignedTo reactive form
    input = viewChild.required<ElementRef<HTMLInputElement>>('input');

    usernames: string[] = [];

    filteredOptions = signal<string[]>(this.usernames.slice());


  filter(): void {
    const filterValue = this.input().nativeElement.value.toLowerCase();
    this.filteredOptions.set(this.usernames.filter(u => u.toLowerCase().includes(filterValue)));
  }

  
  readonly dialogRef = inject(MatDialogRef<CreateTicketDialogComponent>);
   readonly existingTicket =inject(MAT_DIALOG_DATA) as TicketResponse | null;
  /*
   * TicketService is responsible for communicating
   * with our Spring Boot backend.
   */
    constructor(
    private ticketService: TicketService,
    private router: Router,
    private logger: LoggerService,
    private userService : UserService

  ) {}



  ticketForm = new FormGroup({
    title: new FormControl('', [Validators.required,Validators.maxLength(150)]),

    description: new FormControl('', [Validators.required]),

    ticketPriority: new FormControl('', [Validators.required]),

    ticketStatus: new FormControl('OPEN'),

    assignedTo: new FormControl('', [Validators.required])

  }
);
ngOnInit() {

  // usernames for the Assign To autocomplete
  this.userService.getAllUsernames().subscribe({
    next: (usernames) => {
      this.usernames = usernames;
      this.filteredOptions.set(usernames);
    },
    error: (error) => {
      console.error('Failed to load usernames:', error);
    }
  });

  // If editing an existing ticket, fill the form
  console.log('EXISTING TICKET:', this.existingTicket);

  if (this.existingTicket) {
    this.ticketForm.patchValue({
      title: this.existingTicket.title,
      description: this.existingTicket.description,
      ticketPriority: this.existingTicket.ticketPriority,
      ticketStatus: this.existingTicket.ticketStatus,
      assignedTo: this.existingTicket.assignedTo ?? ''
    });
  }
}

public createTicket() {

  if (this.ticketForm.invalid) {
    this.ticketForm.markAllAsTouched();
    return;
  }

  const ticketRequest: TicketRequest = {
    title: this.ticketForm.value.title ?? '',
    description: this.ticketForm.value.description ?? '',
    ticketPriority: this.ticketForm.value.ticketPriority ?? '',
    ticketStatus: this.ticketForm.value.ticketStatus ?? 'OPEN',
    assignedTo: this.ticketForm.value.assignedTo ?? ''
  };

  console.log('TICKET BEING SENT TO BACKEND:', ticketRequest);

  if (this.existingTicket) {

    this.ticketService.updateTicket(this.existingTicket.id, ticketRequest).subscribe({

      next: (response) => {
        console.log('Ticket updated successfully:', response);
        this.logger.info('Ticket updated successfully');
        this.dialogRef.close(response);
      },

      error: (error) => {
        console.error('Failed to update ticket:', error);
        this.logger.error('Failed to update ticket', error);
      }

    });

  } else {

    this.ticketService.submitTicket(ticketRequest).subscribe({

      next: (response) => {
        console.log('Ticket created successfully:', response);
        this.logger.info('Ticket created successfully');

        this.dialogRef.close(response);
      },

      error: (error) => {
        console.error('Failed to create ticket:', error);
        this.logger.error('Failed to create ticket', error);
      }

    });

  }
}

  /*
   * Reset the form back to its original state.
   */
  public reset() {

    this.ticketForm.reset({
      title: '',
      description: '',
      ticketPriority: '',
      ticketStatus: 'OPEN',
      assignedTo: ''
          

    }
  );
  this.logger.info('Ticket form reset');
  }

  public deleteTicket(){
    
    if (!this.existingTicket) {
    return;
    }

  this.ticketService.deleteTicket(this.existingTicket.id).subscribe({

      next: (response) => {
        console.log('Ticket deleted successfully:', response);
        this.logger.info('Ticket deleted successfully');

        this.dialogRef.close(response);
      },

      error: (error) => {
        console.error('Failed to delete ticket:', error);
        this.logger.error('Failed to delete ticket', error);
      }

    });;
  }
 
  


  /*
   * Close the dialog without creating a ticket.
   */
  onCancel() {

    this.dialogRef.close();
  }

}