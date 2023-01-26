import { TestBed } from '@angular/core/testing';

import { LoginAttemptsService } from './login-attempts.service';

describe('LoginAttemptsService', () => {
  let service: LoginAttemptsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginAttemptsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
