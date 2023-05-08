/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcImpactLevel } from './api-error-list-bc-impact-level';
import { BcImpactLevel } from './bc-impact-level';
export interface RestApiResponseListBcImpactLevel {
  error?: ApiErrorListBcImpactLevel;
  result?: Array<BcImpactLevel>;
  status?: boolean;
}

