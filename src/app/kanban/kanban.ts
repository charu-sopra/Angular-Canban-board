import { CdkDrag, CdkDropList, CdkDropListGroup, CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { TicketService } from '../services/ticket.service';
import { Component, OnInit } from '@angular/core';
import { TicketResponse } from '../model/ticket.model';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

@Component({
  imports: [MatButtonToggleModule, MatSidenavModule , MatListModule, CdkDrag, CdkDropList],
  selector: 'app-kanban',
  styleUrl: './kanban.scss',
  templateUrl: './kanban.html',
})


export class Kanban implements OnInit {
 todo: TicketResponse[] = [];  
  inProgress: TicketResponse[] = [];
  finished: TicketResponse[] = []; 

  constructor(private ticketService: TicketService) {}

  ngOnInit() {
  this.ticketService.getTickets().subscribe(response => {


    console.log('FULL RESPONSE:', response);
    console.log('TICKETS:', response.content);
    console.log('NUMBER OF TICKETS:', response.content.length);
    for (let ticket of response.content) {

    

      if (ticket.ticketStatus === 'OPEN') {

        this.todo.push(ticket);

        console.log('→ Added to TODO:', ticket.id);

      }
      else if (ticket.ticketStatus === 'IN_PROGRESS') {

        this.inProgress.push(ticket);

        console.log('→ Added to IN PROGRESS:', ticket.id);

      }
      else if (
        ticket.ticketStatus === 'RESOLVED' ||
        ticket.ticketStatus === 'CLOSED'
      ) {

        this.finished.push(ticket);

        console.log('→ Added to FINISHED:', ticket.id);

      }
    }

    console.log('TODO:', this.todo);
    console.log('IN PROGRESS:', this.inProgress);
    console.log('FINISHED:', this.finished);
  });
}


drop(event: CdkDragDrop<any[]>) 
  {
    if (event.previousContainer === event.container){
      moveItemInArray(
        event.container.data, // "Which array are we modifying?"
        event.previousIndex, //"Where was the item?"
        event.currentIndex   //Where should it go?"
      );
    }
    else
      {
      //if moved to another column
        transferArrayItem(
          event.previousContainer.data, //from where youre moving it
          event.container.data, //where it is being brought
          event.previousIndex,  //idx of where it was
          event.currentIndex   //idx of where its brought now
        );

        const ticket = event.container.data[event.currentIndex];
        let newStatus: string;
          if (event.container.data === this.todo) {
            newStatus = 'OPEN';
          }
          else if (event.container.data === this.inProgress) {
            newStatus = 'IN_PROGRESS';
          }
          else {
            newStatus = 'RESOLVED';
          }
        // Update the ticket's status in Angular
        ticket.ticketStatus = newStatus;
        // Update the ticket in the backend
        this.ticketService.updateTicket(ticket.id, 
          {
            title: ticket.title,
            description: ticket.description,
            ticketPriority: ticket.ticketPriority,
            ticketStatus: newStatus
          })
          .subscribe(
            {
                next: (response) => {
                  console.log('Ticket status updated successfully:', response);
                },

                error: (error) => {
                  console.error('Failed to update ticket status:', error);
                }

          }
        );

      }

  }
}

  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.movies, event.previousIndex, event.currentIndex);
  // }




