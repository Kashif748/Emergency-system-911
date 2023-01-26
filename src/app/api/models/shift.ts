/* tslint:disable */
/* eslint-disable */
import { ShiftConfiguration } from './shift-configuration';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Shift {
  actingNow?: boolean;
  config?: ShiftConfiguration;
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  durationInHours?: number;
  endDate?: string;
  id?: number;
  name?: string;
  seq?: number;
  startTime: string;
  users?: Array<(User | UserInappAuthentication | UserMiddlewareAuth)>;
}

