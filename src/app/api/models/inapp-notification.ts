/* tslint:disable */
/* eslint-disable */
import { NotificationTransaction } from './notification-transaction';
export interface InappNotification {
  actionUrl?: string;
  createdAt?: string;
  id?: number;
  message?: string;
  moduleId?: number;
  notificationTransaction?: NotificationTransaction;
  read?: boolean;
  routing?: string;
  userId?: number;
  uuid?: string;
}

