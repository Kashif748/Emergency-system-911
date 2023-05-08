/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcImpactLevel } from './api-error-bc-impact-level';
import { BcImpactLevel } from './bc-impact-level';
export interface RestApiResponseBcImpactLevel {
  error?: ApiErrorBcImpactLevel;
  result?: BcImpactLevel;
  status?: boolean;
}

