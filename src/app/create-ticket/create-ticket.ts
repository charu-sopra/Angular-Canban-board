// import { Component } from '@angular/core';
// import {FormControl,FormGroup,ReactiveFormsModule,Validators} from '@angular/forms';
// import { MatFormFieldModule } from '@angular/material/form-field';
// import { MatInputModule } from '@angular/material/input';
// import { MatSelectModule } from '@angular/material/select';
// import { MatButtonModule } from '@angular/material/button';
// import { TicketService } from '../services/ticket.service';
// import { Router } from '@angular/router';
// import { TicketRequest } from '../model/ticket.model';
// import { LoggerService } from '../services/logger.service';

// @Component({
//   selector: 'app-create-ticket',
//   standalone: true,
//   imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule],
//   styleUrl: './create-ticket.scss',
//   templateUrl: './create-ticket.html',
// })
// export class Ticket {

//   ticketForm = new FormGroup({

//     title: new FormControl('', [Validators.required, Validators.maxLength(150)],),

//     description: new FormControl('', [
//       Validators.required
//     ]),

//     ticketPriority: new FormControl('', [
//       Validators.required
//     ]),

//     ticketStatus: new FormControl('OPEN'),

//     // createdBy: new FormControl<number | null>(null),

//     // updatedBy: new FormControl<number | null>(null)

//   });

  // constructor(
  //   private ticketService: TicketService,
  //   private router: Router,
  //   private logger: LoggerService
  // ) {}


//   createTicket() {

//     if (this.ticketForm.invalid) {
//       this.ticketForm.markAllAsTouched();
//       return;
//     }
    
    //we will check it's functionality then remove
    //console.log('Ticket:', this.ticketForm.value);
    // this.logger.info('Creating ticket');

//      const ticket: TicketRequest = {
//     title: this.ticketForm.value.title ?? '',
//     description: this.ticketForm.value.description ?? '',
//     ticketPriority: this.ticketForm.value.ticketPriority ?? '',
//     ticketStatus: this.ticketForm.value.ticketStatus ?? 'OPEN'
//      };


//       this.ticketService.createTicket(ticket).subscribe({

//         next: (response) => {

          //console.log('Ticket created successfully:', response);
          // this.logger.info('Ticket created successfully');

//           this.router.navigate(['/home']);

//         },

//         error: (error) => {

         // console.error('Failed to create ticket:', error);
        //  this.logger.error('Failed to create ticket', error);

//         }

//       });


//   }


//   reset() {

//     this.ticketForm.reset({
//       title: '',
//       description: '',
//       ticketPriority: '',
//       ticketStatus: 'OPEN',
//       // createdBy: null,
//       // updatedBy: null
//     });
//     this.logger.info('Ticket form reset');
//   }

// }