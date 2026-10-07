import { Component, inject } from "@angular/core";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { TicketService } from "../services/ticket.service";
import { TicketRequest } from "../model/ticket.model";
import {ReactiveFormsModule,FormGroup,FormControl,Validators} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import {MatDialogTitle,MatDialogContent,MatDialogActions,MatDialogRef} from "@angular/material/dialog";
import { Router } from "@angular/router";
import { LoggerService } from "../services/logger.service";


@Component({
  selector: 'app-create-ticket-dialog',
  standalone: true,

  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatDialogTitle,
    MatDialogContent, MatDialogActions
  ],
  templateUrl: './create-ticket-dialog.html',
  styleUrl: './create-ticket-dialog.scss'
})


export class CreateTicketDialogComponent {

  /*
   * This gives our component a reference to the
   * dialog that is currently open.
   *
   * We will use it to close the popup after
   * successfully creating the ticket.
   */
  readonly dialogRef = inject(MatDialogRef<CreateTicketDialogComponent>);

  /*
   * TicketService is responsible for communicating
   * with our Spring Boot backend.
   */
    constructor(
    private ticketService: TicketService,
    private router: Router,
    private logger: LoggerService
  ) {}


  ticketForm = new FormGroup({
    title: new FormControl('', [Validators.required,Validators.maxLength(150)]),

    description: new FormControl('', [Validators.required]),

    ticketPriority: new FormControl('', [Validators.required]),

    ticketStatus: new FormControl('OPEN'),

    assignedTo: new FormControl('')
  });


  createTicket() {


    /*
     * If required fields are missing,
     * stop here and show the validation messages.
     */
    if (this.ticketForm.invalid) {

      this.ticketForm.markAllAsTouched();

      return;
    }

    console.log('Ticket form values:', this.ticketForm.value);
    this.logger.info('Creating ticket');



    /*
     * Convert the form values into a
     * TicketRequest object.
     */
    const ticket: TicketRequest = {

      title: this.ticketForm.value.title ?? '',
      description: this.ticketForm.value.description ?? '',
      ticketPriority: this.ticketForm.value.ticketPriority ?? '',
      ticketStatus: this.ticketForm.value.ticketStatus ?? 'OPEN',
      assignedTo: this.ticketForm.value.assignedTo ?? ''
    };


    /*
     * Send the TicketRequest to our backend.
     * TicketService will make the HTTP POST request.
     */
    this.ticketService.createTicket(ticket).subscribe({

      next: (response) => {
        console.log('Ticket created successfully:',response);
        this.logger.info('Ticket created successfully');

        this.dialogRef.close(response);
      },

      error: (error) => {

        console.error('Failed to create ticket:',error);
        this.logger.error('Failed to create ticket', error);

      }

    });
  }


  /*
   * Reset the form back to its original state.
   */
  reset() {

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


  /*
   * Close the dialog without creating a ticket.
   */
  onCancel() {

    this.dialogRef.close();
  }

}