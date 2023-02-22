/* tslint:disable */
/* eslint-disable */
import { ApiErrorPushNotificationBody } from './api-error-push-notification-body';
import { PushNotificationBody } from './push-notification-body';
export interface RestApiResponsePushNotificationBody {
  error?: ApiErrorPushNotificationBody;
  result?: PushNotificationBody;
  status?: boolean;
}

