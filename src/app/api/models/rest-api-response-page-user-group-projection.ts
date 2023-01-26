/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageUserGroupProjection } from './api-error-page-user-group-projection';
import { PageUserGroupProjection } from './page-user-group-projection';
export interface RestApiResponsePageUserGroupProjection {
  error?: ApiErrorPageUserGroupProjection;
  result?: PageUserGroupProjection;
  status?: boolean;
}

