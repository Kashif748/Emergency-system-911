import { TestBed } from '@angular/core/testing';

import { ThemeFacade } from './theme.facade';

describe('ThemeFacade', () => {
  let service: ThemeFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ThemeFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
