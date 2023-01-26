/* tslint:disable */
/* eslint-disable */
import { ApiErrorRoleProjection } from './api-error-role-projection';
import { RoleProjection } from './role-projection';
export interface RestApiResponseRoleProjection {
  error?: ApiErrorRoleProjection;
  result?: RoleProjection;
  status?: boolean;
}

