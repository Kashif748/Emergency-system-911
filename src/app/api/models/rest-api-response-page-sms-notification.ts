/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageSmsNotification } from './api-error-page-sms-notification';
import { PageSmsNotification } from './page-sms-notification';
export interface RestApiResponsePageSmsNotification {
  error?: ApiErrorPageSmsNotification;
  result?: PageSmsNotification;
  status?: boolean;
}

