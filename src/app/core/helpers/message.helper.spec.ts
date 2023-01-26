/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MessageHelper } from './message.helper';

describe('Service: Message', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MessageHelper],
    });
  });

  it('should ...', inject([MessageHelper], (service: MessageHelper) => {
    expect(service).toBeTruthy();
  }));
});
