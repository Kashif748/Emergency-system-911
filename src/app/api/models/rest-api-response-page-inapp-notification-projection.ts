/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageInappNotificationProjection } from './api-error-page-inapp-notification-projection';
import { PageInappNotificationProjection } from './page-inapp-notification-projection';
export interface RestApiResponsePageInappNotificationProjection {
  error?: ApiErrorPageInappNotificationProjection;
  result?: PageInappNotificationProjection;
  status?: boolean;
}

