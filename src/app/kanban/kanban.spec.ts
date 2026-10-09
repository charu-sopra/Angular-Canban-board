import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, of } from 'rxjs';
import { Kanban } from './kanban';
import { TicketResponse } from '../model/ticket.model';
import { TicketService } from '../services/ticket.service';

describe('Kanban', () => {
  let component: Kanban;
  let fixture: ComponentFixture<Kanban>;
  let searchResults: BehaviorSubject<TicketResponse[] | null>;

  beforeEach(async () => {
    searchResults = new BehaviorSubject<TicketResponse[] | null>(null);

    await TestBed.configureTestingModule({
      imports: [Kanban],
      providers: [
        {
          provide: TicketService,
          useValue: {
            searchResults$: searchResults.asObservable(),
            getTickets: () => of({
              content: [{
                id: 1,
                title: 'Full board ticket',
                description: 'Ticket in the full board',
                ticketStatus: 'OPEN',
                ticketPriority: 'LOW',
                createdBy: 'Tester',
                createdAt: '',
                updatedBy: null,
                updatedAt: null
              }]
            }),
            updateTicket: () => of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Kanban);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('shows search results on the board and restores all tickets when cleared', () => {
    const searchedTicket: TicketResponse = {
      id: 2,
      title: 'Matching ticket',
      description: 'Found by search',
      ticketStatus: 'IN_PROGRESS',
      ticketPriority: 'HIGH',
      createdBy: 'Tester',
      createdAt: '',
      updatedBy: null,
      updatedAt: null
    };

    searchResults.next([searchedTicket]);

    expect(component.todo).toHaveLength(0);
    expect(component.inProgress).toEqual([searchedTicket]);

    searchResults.next(null);

    expect(component.todo.map((ticket) => ticket.id)).toEqual([1]);
    expect(component.inProgress).toHaveLength(0);
  });
});
