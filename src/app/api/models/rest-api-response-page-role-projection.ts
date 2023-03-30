/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageRoleProjection } from './api-error-page-role-projection';
import { PageRoleProjection } from './page-role-projection';
export interface RestApiResponsePageRoleProjection {
  error?: ApiErrorPageRoleProjection;
  result?: PageRoleProjection;
  status?: boolean;
}

