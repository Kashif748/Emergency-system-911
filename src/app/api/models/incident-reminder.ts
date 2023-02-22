/* tslint:disable */
/* eslint-disable */
import { Incident } from './incident';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface IncidentReminder {
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  description?: string;
  id?: number;
  incident?: Incident;
  isActive?: boolean;
  reminderDate?: string;
  status?: 'PENDING' | 'PROCESSED';
}

