/* tslint:disable */
/* eslint-disable */
import { ApiErrorListUserModulePrivilegeProjection } from './api-error-list-user-module-privilege-projection';
import { UserModulePrivilegeProjection } from './user-module-privilege-projection';
export interface RestApiResponseListUserModulePrivilegeProjection {
  error?: ApiErrorListUserModulePrivilegeProjection;
  result?: Array<UserModulePrivilegeProjection>;
  status?: boolean;
}

