/* tslint:disable */
/* eslint-disable */
import { ApiErrorListGroupUser } from './api-error-list-group-user';
import { GroupUser } from './group-user';
export interface RestApiResponseListGroupUser {
  error?: ApiErrorListGroupUser;
  result?: Array<GroupUser>;
  status?: boolean;
}

