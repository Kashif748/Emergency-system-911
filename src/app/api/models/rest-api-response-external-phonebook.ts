/* tslint:disable */
/* eslint-disable */
import { ApiErrorExternalPhonebook } from './api-error-external-phonebook';
import { ExternalPhonebook } from './external-phonebook';
export interface RestApiResponseExternalPhonebook {
  error?: ApiErrorExternalPhonebook;
  result?: ExternalPhonebook;
  status?: boolean;
}

