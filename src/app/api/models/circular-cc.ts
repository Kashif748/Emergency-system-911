/* tslint:disable */
/* eslint-disable */
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface CircularCc {
  id?: number;
  user: (User | UserInappAuthentication | UserMiddlewareAuth);
}

