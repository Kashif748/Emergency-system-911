/* tslint:disable */
/* eslint-disable */
import { ApiErrorPushNotificationAction } from './api-error-push-notification-action';
import { PushNotificationAction } from './push-notification-action';
export interface RestApiResponsePushNotificationAction {
  error?: ApiErrorPushNotificationAction;
  result?: PushNotificationAction;
  status?: boolean;
}

