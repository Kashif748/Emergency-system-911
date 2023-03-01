/* tslint:disable */
/* eslint-disable */
import { ApiErrorListGroup } from './api-error-list-group';
import { Group } from './group';
export interface RestApiResponseListGroup {
  error?: ApiErrorListGroup;
  result?: Array<Group>;
  status?: boolean;
}

