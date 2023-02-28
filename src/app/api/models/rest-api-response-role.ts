/* tslint:disable */
/* eslint-disable */
import { ApiErrorRole } from './api-error-role';
import { Role } from './role';
export interface RestApiResponseRole {
  error?: ApiErrorRole;
  result?: Role;
  status?: boolean;
}

