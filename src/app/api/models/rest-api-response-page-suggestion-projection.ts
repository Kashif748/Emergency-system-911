/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageSuggestionProjection } from './api-error-page-suggestion-projection';
import { PageSuggestionProjection } from './page-suggestion-projection';
export interface RestApiResponsePageSuggestionProjection {
  error?: ApiErrorPageSuggestionProjection;
  result?: PageSuggestionProjection;
  status?: boolean;
}

