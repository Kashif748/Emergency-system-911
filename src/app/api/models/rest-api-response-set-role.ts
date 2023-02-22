/* tslint:disable */
/* eslint-disable */
import { ApiErrorSetRole } from './api-error-set-role';
import { Role } from './role';
export interface RestApiResponseSetRole {
  error?: ApiErrorSetRole;
  result?: Array<Role>;
  status?: boolean;
}

