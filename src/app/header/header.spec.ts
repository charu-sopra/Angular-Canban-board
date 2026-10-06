import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Header } from './header';
import { TicketService } from '../services/ticket.service';
import { TicketResponse } from '../model/ticket.model';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;
  let publishedResults: TicketResponse[] | null | undefined;

  beforeEach(async () => {
    publishedResults = undefined;

    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        {
          provide: TicketService,
          useValue: {
            searchTickets: () => of({
              content: [{
                id: 42,
                title: 'Onboarding API',
                description: 'Create the service integration',
                ticketStatus: 'IN_PROGRESS',
                ticketPriority: 'HIGH',
                createdBy: 'Tester',
                createdAt: '',
                updatedBy: null,
                updatedAt: null
              }]
            }),
            setSearchResults: (tickets: TicketResponse[] | null) => {
              publishedResults = tickets;
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('loads and filters tickets from the search field', () => {
    const input: HTMLInputElement = fixture.nativeElement.querySelector('#ticket-search');
    input.value = 'onboarding';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const form: HTMLFormElement = fixture.nativeElement.querySelector('.ticket-search-form');
    form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('Onboarding API');
    expect(fixture.nativeElement.textContent).toContain('Ticket #42');
    expect(publishedResults?.[0].id).toBe(42);
  });

  it('clears the shared search results when search is cleared', () => {
    component.clearSearch();

    expect(publishedResults).toBeNull();
  });
});
