/* tslint:disable */
/* eslint-disable */
import { ApiErrorMapLongListPrivilege } from './api-error-map-long-list-privilege';
import { Privilege } from './privilege';
export interface RestApiResponseMapLongListPrivilege {
  error?: ApiErrorMapLongListPrivilege;
  result?: { [key: string]: Array<Privilege> };
  status?: boolean;
}

