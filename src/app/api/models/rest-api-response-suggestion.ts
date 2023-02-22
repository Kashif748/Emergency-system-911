/* tslint:disable */
/* eslint-disable */
import { ApiErrorSuggestion } from './api-error-suggestion';
import { Suggestion } from './suggestion';
export interface RestApiResponseSuggestion {
  error?: ApiErrorSuggestion;
  result?: Suggestion;
  status?: boolean;
}

