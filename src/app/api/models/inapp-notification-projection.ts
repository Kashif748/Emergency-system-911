/* tslint:disable */
/* eslint-disable */
import { NotificationTransactionProjection } from './notification-transaction-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface InappNotificationProjection {
  createdAt?: string;
  getuserCreatedBy?: UserIdNameProjection;
  id?: number;
  isRead?: boolean;
  message?: string;
  notificationTransaction?: NotificationTransactionProjection;
}

