/* tslint:disable */
/* eslint-disable */
import { ApiErrorOrgStructure } from './api-error-org-structure';
import { OrgStructure } from './org-structure';
export interface RestApiResponseOrgStructure {
  error?: ApiErrorOrgStructure;
  result?: OrgStructure;
  status?: boolean;
}

