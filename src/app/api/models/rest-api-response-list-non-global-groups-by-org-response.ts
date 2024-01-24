/* tslint:disable */
/* eslint-disable */
import { ApiErrorListNonGlobalGroupsByOrgResponse } from './api-error-list-non-global-groups-by-org-response';
import { NonGlobalGroupsByOrgResponse } from './non-global-groups-by-org-response';
export interface RestApiResponseListNonGlobalGroupsByOrgResponse {
  error?: ApiErrorListNonGlobalGroupsByOrgResponse;
  result?: Array<NonGlobalGroupsByOrgResponse>;
  status?: boolean;
}

