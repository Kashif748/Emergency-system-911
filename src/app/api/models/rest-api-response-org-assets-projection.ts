/* tslint:disable */
/* eslint-disable */
import { ApiErrorOrgAssetsProjection } from './api-error-org-assets-projection';
import { OrgAssetsProjection } from './org-assets-projection';
export interface RestApiResponseOrgAssetsProjection {
  error?: ApiErrorOrgAssetsProjection;
  result?: OrgAssetsProjection;
  status?: boolean;
}

