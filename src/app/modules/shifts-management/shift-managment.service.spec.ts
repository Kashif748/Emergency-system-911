import { TestBed } from '@angular/core/testing';

import { ShiftManagmentService } from './shift-managment.service';

describe('ShiftManagmentService', () => {
  let service: ShiftManagmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ShiftManagmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
