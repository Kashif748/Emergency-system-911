/* tslint:disable */
/* eslint-disable */
import { ApiErrorPagePushNotificationAction } from './api-error-page-push-notification-action';
import { PagePushNotificationAction } from './page-push-notification-action';
export interface RestApiResponsePagePushNotificationAction {
  error?: ApiErrorPagePushNotificationAction;
  result?: PagePushNotificationAction;
  status?: boolean;
}

