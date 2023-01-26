/* tslint:disable */
/* eslint-disable */
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface LeaveCalendar {
  active?: boolean;
  createdAt?: string;
  id?: number;
  leave: string;
  user: (User | UserInappAuthentication | UserMiddlewareAuth);
}

