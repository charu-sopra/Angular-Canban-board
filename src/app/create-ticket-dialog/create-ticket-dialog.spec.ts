import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateTicketDialogComponent } from './create-ticket-dialog';

describe('CreateTicketDialogue', () => {
  let component: CreateTicketDialogComponent;
  let fixture: ComponentFixture<CreateTicketDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateTicketDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateTicketDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
