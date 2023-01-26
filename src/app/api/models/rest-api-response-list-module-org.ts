/* tslint:disable */
/* eslint-disable */
import { ApiErrorListModuleOrg } from './api-error-list-module-org';
import { ModuleOrg } from './module-org';
export interface RestApiResponseListModuleOrg {
  error?: ApiErrorListModuleOrg;
  result?: Array<ModuleOrg>;
  status?: boolean;
}

