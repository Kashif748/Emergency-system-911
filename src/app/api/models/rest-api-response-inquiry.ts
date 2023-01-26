/* tslint:disable */
/* eslint-disable */
import { ApiErrorInquiry } from './api-error-inquiry';
import { Inquiry } from './inquiry';
export interface RestApiResponseInquiry {
  error?: ApiErrorInquiry;
  result?: Inquiry;
  status?: boolean;
}

