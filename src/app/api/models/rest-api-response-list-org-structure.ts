/* tslint:disable */
/* eslint-disable */
import { ApiErrorListOrgStructure } from './api-error-list-org-structure';
import { OrgStructure } from './org-structure';
export interface RestApiResponseListOrgStructure {
  error?: ApiErrorListOrgStructure;
  result?: Array<OrgStructure>;
  status?: boolean;
}

