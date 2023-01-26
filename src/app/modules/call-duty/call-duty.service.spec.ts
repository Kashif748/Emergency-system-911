import { TestBed } from '@angular/core/testing';

import { CallDutyService } from './call-duty.service';

describe('CallDutyService', () => {
  let service: CallDutyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CallDutyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
