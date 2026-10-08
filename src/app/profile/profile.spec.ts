import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Profile } from './profile';

describe('Profile', () => {
  let component: Profile;
  let fixture: ComponentFixture<Profile>;
  let httpTestingController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Profile],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(Profile);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:8080/profile').flush({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      createdAt: '2026-01-01T00:00:00',
    });
    expect(component).toBeTruthy();
  });

  it('should show the profile after it loads', async () => {
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:8080/profile').flush({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      createdAt: '2026-01-01T00:00:00',
    });
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.user()).toEqual({
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      createdAt: '2026-01-01T00:00:00',
    });
    expect(component.loading()).toBe(false);
    expect(fixture.nativeElement.textContent).toContain('Test User');
    expect(fixture.nativeElement.textContent).toContain('test@example.com');
  });

  it('should show an error when the profile request fails', async () => {
    fixture.detectChanges();
    httpTestingController.expectOne('http://localhost:8080/profile').flush(
      { message: 'Unauthorized' },
      { status: 401, statusText: 'Unauthorized' },
    );
    await fixture.whenStable();
    fixture.detectChanges();

    expect(component.loading()).toBe(false);
    expect(component.errorMessage()).toContain('HTTP 401 Unauthorized');
    expect(fixture.nativeElement.textContent).toContain('HTTP 401 Unauthorized');
  });
});
