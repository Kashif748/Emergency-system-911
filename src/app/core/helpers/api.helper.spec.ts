/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ApiHelper } from './api.helper';

describe('Service: ApiHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiHelper],
    });
  });

  it('should ...', inject([ApiHelper], (service: ApiHelper) => {
    expect(service).toBeTruthy();
  }));
});
