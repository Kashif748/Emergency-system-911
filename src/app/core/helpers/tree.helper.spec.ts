/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { TreeHelper } from './tree.helper';

describe('Service: TreeHelper', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TreeHelper],
    });
  });

  it('should ...', inject([TreeHelper], (service: TreeHelper) => {
    expect(service).toBeTruthy();
  }));
});
