/* tslint:disable */
/* eslint-disable */
import { ApiErrorPagePushNotificationBody } from './api-error-page-push-notification-body';
import { PagePushNotificationBody } from './page-push-notification-body';
export interface RestApiResponsePagePushNotificationBody {
  error?: ApiErrorPagePushNotificationBody;
  result?: PagePushNotificationBody;
  status?: boolean;
}

