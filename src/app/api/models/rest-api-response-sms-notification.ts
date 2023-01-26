/* tslint:disable */
/* eslint-disable */
import { ApiErrorSmsNotification } from './api-error-sms-notification';
import { SmsNotification } from './sms-notification';
export interface RestApiResponseSmsNotification {
  error?: ApiErrorSmsNotification;
  result?: SmsNotification;
  status?: boolean;
}

