/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcWorkImportanceLevels } from './api-error-list-bc-work-importance-levels';
import { BcWorkImportanceLevels } from './bc-work-importance-levels';
export interface RestApiResponseListBcWorkImportanceLevels {
  error?: ApiErrorListBcWorkImportanceLevels;
  result?: Array<BcWorkImportanceLevels>;
  status?: boolean;
}

