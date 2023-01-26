/* tslint:disable */
/* eslint-disable */
import { ApiErrorListPrivilege } from './api-error-list-privilege';
import { Privilege } from './privilege';
export interface RestApiResponseListPrivilege {
  error?: ApiErrorListPrivilege;
  result?: Array<Privilege>;
  status?: boolean;
}

