/* tslint:disable */
/* eslint-disable */
import { ApiErrorSuggestionStatus } from './api-error-suggestion-status';
import { SuggestionStatus } from './suggestion-status';
export interface RestApiResponseSuggestionStatus {
  error?: ApiErrorSuggestionStatus;
  result?: SuggestionStatus;
  status?: boolean;
}

