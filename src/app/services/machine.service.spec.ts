import { TestBed } from '@angular/core/testing';
import { Machine } from './machine.service';

describe('Machine', () => {
  let service: Machine;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Machine);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
