/* tslint:disable */
/* eslint-disable */
import { ApiErrorPushNotificationBodyProjection } from './api-error-push-notification-body-projection';
import { PushNotificationBodyProjection } from './push-notification-body-projection';
export interface RestApiResponsePushNotificationBodyProjection {
  error?: ApiErrorPushNotificationBodyProjection;
  result?: PushNotificationBodyProjection;
  status?: boolean;
}

