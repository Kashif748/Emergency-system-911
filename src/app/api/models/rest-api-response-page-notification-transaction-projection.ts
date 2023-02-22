/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageNotificationTransactionProjection } from './api-error-page-notification-transaction-projection';
import { PageNotificationTransactionProjection } from './page-notification-transaction-projection';
export interface RestApiResponsePageNotificationTransactionProjection {
  error?: ApiErrorPageNotificationTransactionProjection;
  result?: PageNotificationTransactionProjection;
  status?: boolean;
}

