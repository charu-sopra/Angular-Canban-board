import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginTemp } from './login-temp';

describe('LoginTemp', () => {
  let component: LoginTemp;
  let fixture: ComponentFixture<LoginTemp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginTemp],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginTemp);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
