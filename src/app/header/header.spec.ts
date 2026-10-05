import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { Header } from './header';
import { TicketService } from '../services/ticket.service';

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header],
      providers: [
        {
          provide: TicketService,
          useValue: {
            getTickets: () => of([{
              id: 42,
              title: 'Onboarding API',
              description: 'Create the service integration',
              ticketStatus: 'IN_PROGRESS',
              ticketPriority: 'HIGH',
              createdBy: 'Tester',
              createdAt: '',
              updatedBy: null,
              updatedAt: null
            }])
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

    expect(fixture.nativeElement.textContent).toContain('Onboarding API');
    expect(fixture.nativeElement.textContent).toContain('Ticket #42');
  });
});
