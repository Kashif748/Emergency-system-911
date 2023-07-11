/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcOrgHierarchy } from './api-error-list-bc-org-hierarchy';
import { BcOrgHierarchy } from './bc-org-hierarchy';
export interface RestApiResponseListBcOrgHierarchy {
  error?: ApiErrorListBcOrgHierarchy;
  result?: Array<BcOrgHierarchy>;
  status?: boolean;
}

