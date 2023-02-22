/* tslint:disable */
/* eslint-disable */
import { NotificationTransactionProjection } from './notification-transaction-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface SmsNotificationProjection {
  body?: string;
  createdOn?: string;
  id?: number;
  mobileNumber?: string;
  notificationTransaction?: NotificationTransactionProjection;
  sentDate?: string;
  status?: 'IN_PROCESS' | 'SENT' | 'FAILED' | 'WARNING';
  userCreatedBy?: UserIdNameProjection;
}

