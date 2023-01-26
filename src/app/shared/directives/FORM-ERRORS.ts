import { InjectionToken } from '@angular/core';

export const defaultErrors = {
    required:(err)=> 'THIS_FIELD_IS_REQUIRED',
    minlength: ({ requiredLength, actualLength }) => `Expect ${requiredLength} but got ${actualLength}`
}

export const FORM_ERRORS = new InjectionToken('FORM_ERRORS', {
    providedIn: 'root',
    factory: () => defaultErrors
  });