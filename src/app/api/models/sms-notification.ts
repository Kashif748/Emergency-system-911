/* tslint:disable */
/* eslint-disable */
import { NotificationTransaction } from './notification-transaction';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface SmsNotification {
  body?: string;
  createdBy?: number;
  createdOn?: string;
  gateway?: 'ETISALAT' | 'MIDDLEWARE';
  id?: number;
  mobileNumber?: string;
  municipality?: string;
  notificationTransaction?: NotificationTransaction;
  orgId?: number;
  sentDate?: string;
  status?: 'IN_PROCESS' | 'SENT' | 'FAILED' | 'WARNING';
  user?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

