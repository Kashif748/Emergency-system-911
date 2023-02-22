/* tslint:disable */
/* eslint-disable */
import { ApiErrorPagePushNotificationBodyProjection } from './api-error-page-push-notification-body-projection';
import { PagePushNotificationBodyProjection } from './page-push-notification-body-projection';
export interface RestApiResponsePagePushNotificationBodyProjection {
  error?: ApiErrorPagePushNotificationBodyProjection;
  result?: PagePushNotificationBodyProjection;
  status?: boolean;
}

