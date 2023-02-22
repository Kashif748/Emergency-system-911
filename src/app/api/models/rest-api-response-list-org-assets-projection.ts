/* tslint:disable */
/* eslint-disable */
import { ApiErrorListOrgAssetsProjection } from './api-error-list-org-assets-projection';
import { OrgAssetsProjection } from './org-assets-projection';
export interface RestApiResponseListOrgAssetsProjection {
  error?: ApiErrorListOrgAssetsProjection;
  result?: Array<OrgAssetsProjection>;
  status?: boolean;
}

