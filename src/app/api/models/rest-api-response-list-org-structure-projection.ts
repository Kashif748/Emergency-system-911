/* tslint:disable */
/* eslint-disable */
import { ApiErrorListOrgStructureProjection } from './api-error-list-org-structure-projection';
import { OrgStructureProjection } from './org-structure-projection';
export interface RestApiResponseListOrgStructureProjection {
  error?: ApiErrorListOrgStructureProjection;
  result?: Array<OrgStructureProjection>;
  status?: boolean;
}

