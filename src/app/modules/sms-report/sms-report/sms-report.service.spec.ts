import { TestBed } from '@angular/core/testing';

import { SmsReportService } from './sms-report.service';

describe('SmsReportService', () => {
  let service: SmsReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SmsReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
