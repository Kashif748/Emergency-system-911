/* tslint:disable */
/* eslint-disable */
import { ApiErrorListSuggestionStatus } from './api-error-list-suggestion-status';
import { SuggestionStatus } from './suggestion-status';
export interface RestApiResponseListSuggestionStatus {
  error?: ApiErrorListSuggestionStatus;
  result?: Array<SuggestionStatus>;
  status?: boolean;
}

