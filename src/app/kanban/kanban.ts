
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';

import { DatePipe } from '@angular/common';

import {
  ChangeDetectorRef,
  Component,
  DestroyRef,
  inject,
  OnInit
} from '@angular/core';

import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import {
  MatButtonToggleChange,
  MatButtonToggleModule
} from '@angular/material/button-toggle';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

import { TicketService } from '../services/ticket.service';
import { TicketResponse } from '../model/ticket.model';
import { CreateTicketDialogComponent } from '../create-ticket-dialog/create-ticket-dialog';

@Component({
  imports: [
    DatePipe,
    MatButtonToggleModule,
    MatSidenavModule,
    MatListModule,
    CdkDrag,
    CdkDropList,
    MatButtonModule
  ],
  selector: 'app-kanban',
  styleUrl: './kanban.scss',
  templateUrl: './kanban.html'
})
export class Kanban implements OnInit {

  // Controls which ticket view is displayed
  showMyTickets = false;

  // Material dialog
  readonly dialog = inject(MatDialog);

  // Kanban columns
  todo: TicketResponse[] = [];
  inProgress: TicketResponse[] = [];
  finished: TicketResponse[] = [];

  // All tickets fetched from the backend
  private allTickets: TicketResponse[] = [];

  // Current search results; null means no active search filter
  private activeSearchResults: TicketResponse[] | null = null;

  // Automatically clean up subscriptions on component destruction
  private destroyRef = inject(DestroyRef);

  constructor(
    private ticketService: TicketService,
    private changeDetector: ChangeDetectorRef
  ) {}

  ngOnInit(): void {

    // Listen for search changes
    this.ticketService.searchResults$
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((results) => {

        this.activeSearchResults = results;

        // Do not let search results overwrite the My Tickets view
        if (!this.showMyTickets) {
          this.setTickets(results ?? this.allTickets);
        }
      });

    // Load all tickets when the Kanban first opens
    this.loadAllTickets();
  }

  // Handle the All Tickets / My Tickets toggle
  myTicketsToggle(event: MatButtonToggleChange): void {

    this.showMyTickets = event.value === 'myTickets';

    if (this.showMyTickets) {
      this.loadMyTickets();
    } else {
      this.setTickets(
        this.activeSearchResults ?? this.allTickets
      );
    }
  }

  // Fetch tickets belonging to the logged-in user
  loadMyTickets(): void {

    this.ticketService.getMyTickets()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {

          // Ignore an old response if the user has switched views
          if (!this.showMyTickets) {
            return;
          }

          this.setTickets(response.content);
        },
        error: (error) => {
          console.error('Failed to fetch my tickets:', error);
        }
      });
  }

  // Fetch all tickets
  loadAllTickets(): void {

    this.ticketService.getTickets()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe({
        next: (response) => {

          this.allTickets = response.content;

          // Do not replace My Tickets if its toggle is on
          if (!this.showMyTickets) {
            this.setTickets(
              this.activeSearchResults ?? this.allTickets
            );
          }
        },
        error: (error) => {
          console.error('Failed to fetch all tickets:', error);
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

  // Open the Create/Edit Ticket dialog
  openTicketDialog(ticket?: TicketResponse): void {

    const dialogRef = this.dialog.open(
      CreateTicketDialogComponent,
      {
        width: '650px',
        maxWidth: '90vw',
        data: ticket
      }
    );

    dialogRef.afterClosed()
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((result) => {

        if (result) {
          console.log('Ticket saved:', result);

          // Reload the current view so edits and creations
          // are reflected without manually adding duplicates.
          if (this.showMyTickets) {
            this.loadMyTickets();
          } else {
            this.loadAllTickets();
          }
        }
      });
  }

  // Handle Kanban drag and drop
  drop(event: CdkDragDrop<TicketResponse[]>): void {

    // Reordering inside the same column
    if (event.previousContainer === event.container) {

      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      return;
    }

    // Move ticket between columns
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );

    const ticket = event.container.data[event.currentIndex];

    // Determine the destination column's status
    const newStatus: TicketResponse['ticketStatus'] =
      event.container.data === this.todo
        ? 'OPEN'
        : event.container.data === this.inProgress
          ? 'IN_PROGRESS'
          : 'RESOLVED';

    // Save the previous status in case the API call fails
    const previousStatus = ticket.ticketStatus;

    ticket.ticketStatus = newStatus;

    // Persist the status change in the backend
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
    .pipe(takeUntilDestroyed(this.destroyRef))
    .subscribe({

      next: (response) => {
        console.log('Ticket status updated successfully:', response);
      },

      error: (error) => {

        console.error('Failed to update ticket status:', error);

        // Restore the ticket's previous status
        ticket.ticketStatus = previousStatus;

        // Reload the current view to restore the correct column placement
        if (this.showMyTickets) {
          this.loadMyTickets();
        } else {
          this.loadAllTickets();
        }
      }
    });
  }
}
