/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageInappNotification } from './api-error-page-inapp-notification';
import { PageInappNotification } from './page-inapp-notification';
export interface RestApiResponsePageInappNotification {
  error?: ApiErrorPageInappNotification;
  result?: PageInappNotification;
  status?: boolean;
}

