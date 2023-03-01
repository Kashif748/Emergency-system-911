/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageNotificationPlaceholder } from './api-error-page-notification-placeholder';
import { PageNotificationPlaceholder } from './page-notification-placeholder';
export interface RestApiResponsePageNotificationPlaceholder {
  error?: ApiErrorPageNotificationPlaceholder;
  result?: PageNotificationPlaceholder;
  status?: boolean;
}

