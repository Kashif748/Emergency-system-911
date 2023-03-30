/* tslint:disable */
/* eslint-disable */
import { ApiErrorSuggestionProjection } from './api-error-suggestion-projection';
import { SuggestionProjection } from './suggestion-projection';
export interface RestApiResponseSuggestionProjection {
  error?: ApiErrorSuggestionProjection;
  result?: SuggestionProjection;
  status?: boolean;
}

