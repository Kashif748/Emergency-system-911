/* tslint:disable */
/* eslint-disable */
import { EmailNotificationReceiverProjection } from './email-notification-receiver-projection';
import { NotificationTransactionProjection } from './notification-transaction-projection';
export interface EmailNotificationProjection {
  createdOn?: string;
  emailBody?: string;
  emailNotificationReceivers?: Array<EmailNotificationReceiverProjection>;
  id?: number;
  notificationTransaction?: NotificationTransactionProjection;
  status?: 'IN_PROCESS' | 'SENT' | 'FAILED' | 'WARNING';
  subject?: string;
}

