/* tslint:disable */
/* eslint-disable */
import { ApiErrorUser } from './api-error-user';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface RestApiResponseUser {
  error?: ApiErrorUser;
  result?: (User | UserInappAuthentication | UserMiddlewareAuth);
  status?: boolean;
}

