/* tslint:disable */
/* eslint-disable */
import { ApiErrorListInquiry } from './api-error-list-inquiry';
import { Inquiry } from './inquiry';
export interface RestApiResponseListInquiry {
  error?: ApiErrorListInquiry;
  result?: Array<Inquiry>;
  status?: boolean;
}

