/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageEmailNotificationProjection } from './api-error-page-email-notification-projection';
import { PageEmailNotificationProjection } from './page-email-notification-projection';
export interface RestApiResponsePageEmailNotificationProjection {
  error?: ApiErrorPageEmailNotificationProjection;
  result?: PageEmailNotificationProjection;
  status?: boolean;
}

