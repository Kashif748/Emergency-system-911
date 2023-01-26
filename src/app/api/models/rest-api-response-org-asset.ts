/* tslint:disable */
/* eslint-disable */
import { ApiErrorOrgAsset } from './api-error-org-asset';
import { OrgAsset } from './org-asset';
export interface RestApiResponseOrgAsset {
  error?: ApiErrorOrgAsset;
  result?: OrgAsset;
  status?: boolean;
}

