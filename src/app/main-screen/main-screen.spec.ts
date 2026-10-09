import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { MainScreen } from './main-screen';

describe('MainScreen', () => {
  let component: MainScreen;
  let fixture: ComponentFixture<MainScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainScreen],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(MainScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should provide login and signup links', () => {
    const links = fixture.nativeElement.querySelectorAll('a[routerLink]');
    const destinations = Array.from(links, (link: any) => link.getAttribute('routerLink'));

    expect(destinations).toContain('/login');
    expect(destinations).toContain('/signup');
    expect(fixture.nativeElement.textContent).toContain('Ticket Service');
  });
});
