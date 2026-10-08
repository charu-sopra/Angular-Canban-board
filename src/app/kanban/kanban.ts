import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
  
} from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit,
  
  
} from '@angular/core';

import { TicketService } from '../services/ticket.service';
import { TicketResponse } from '../model/ticket.model';

import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { CreateTicketDialogComponent } from '../create-ticket-dialog/create-ticket-dialog';
import { MatButtonModule } from '@angular/material/button';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  imports: [ DatePipe, MatButtonToggleModule,MatSidenavModule,MatListModule,CdkDrag, CdkDropList, MatButtonModule],
  selector: 'app-kanban',
  styleUrl: './kanban.scss',
  templateUrl: './kanban.html',
})

export class Kanban implements OnInit {

  // material dialog
  readonly dialog = inject(MatDialog);

  // ticket columns
  todo: TicketResponse[] = [];
  inProgress: TicketResponse[] = [];
  finished: TicketResponse[] = [];

  // all tickets received from backend
  private allTickets: TicketResponse[] = [];

  // search results currently being displayed
  private activeSearchResults: TicketResponse[] | null = null;

  // Used to automatically clean up subscriptions
  private destroyRef = inject(DestroyRef);


  constructor(
    private ticketService: TicketService,
    private changeDetector: ChangeDetectorRef
  ) {}


  ngOnInit() {

    // Listen for search results
    this.ticketService.searchResults$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((results) => {

        this.activeSearchResults = results;

        this.setTickets(results ?? this.allTickets);

      });


    // Load tickets when Kanban first opens
    this.ticketService.getTickets().subscribe((response) => {

      this.allTickets = response.content;

      if (this.activeSearchResults === null) {

        this.setTickets(this.allTickets);

      }

    });

  }


  // Put tickets into the correct Kanban column
  private setTickets(tickets: TicketResponse[]): void {

    this.todo = tickets.filter(
      (ticket) => ticket.ticketStatus === 'OPEN'
    );

    this.inProgress = tickets.filter(
      (ticket) => ticket.ticketStatus === 'IN_PROGRESS'
    );

    this.finished = tickets.filter(
      (ticket) =>
        ticket.ticketStatus === 'RESOLVED' ||
        ticket.ticketStatus === 'CLOSED'
    );

    this.changeDetector.markForCheck();
  }


  // Add one newly created ticket to the correct column
  addTicketToBoard(ticket: TicketResponse) {

    if (ticket.ticketStatus === 'OPEN') {

      this.todo.push(ticket);

    }
    else if (ticket.ticketStatus === 'IN_PROGRESS') {

      this.inProgress.push(ticket);

    }
    else if (
      ticket.ticketStatus === 'RESOLVED' ||
      ticket.ticketStatus === 'CLOSED'
    ) {

      this.finished.push(ticket);

    }

  }


  // Open Create/Edit Ticket dialog
  openTicketDialog(ticket? : TicketResponse) {

    const dialogRef = this.dialog.open(CreateTicketDialogComponent,
      {
        width: '650px',
        maxWidth: '90vw',
        data:ticket
      }
    );
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Ticket received by Kanban:',result);
        this.addTicketToBoard(result);

      }

    });

  }


  // Handle drag and drop
  drop(event: CdkDragDrop<any[]>) {

    if (event.previousContainer === event.container) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

    }
    else {

      // Move ticket between Kanban columns
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );


      const ticket =
        event.container.data[event.currentIndex];


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


      // Update Angular's local ticket state
      ticket.ticketStatus = newStatus;


      // Update ticket in backend
      this.ticketService.updateTicket(
        ticket.id,
        {
          title: ticket.title,
          description: ticket.description,
          ticketPriority: ticket.ticketPriority,
          ticketStatus: newStatus,
          assignedTo: ticket.assignedTo
        }
      )
      .subscribe({

        next: (response) => {

          console.log(
            'Ticket status updated successfully:',
            response
          );

        },

        error: (error) => {

          console.error(
            'Failed to update ticket status:',
            error
          );

        }

      });

    }

  }

}