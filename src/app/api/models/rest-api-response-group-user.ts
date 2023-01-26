/* tslint:disable */
/* eslint-disable */
import { ApiErrorGroupUser } from './api-error-group-user';
import { GroupUser } from './group-user';
export interface RestApiResponseGroupUser {
  error?: ApiErrorGroupUser;
  result?: GroupUser;
  status?: boolean;
}

