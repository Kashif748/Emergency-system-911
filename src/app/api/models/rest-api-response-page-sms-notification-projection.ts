/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageSmsNotificationProjection } from './api-error-page-sms-notification-projection';
import { PageSmsNotificationProjection } from './page-sms-notification-projection';
export interface RestApiResponsePageSmsNotificationProjection {
  error?: ApiErrorPageSmsNotificationProjection;
  result?: PageSmsNotificationProjection;
  status?: boolean;
}

