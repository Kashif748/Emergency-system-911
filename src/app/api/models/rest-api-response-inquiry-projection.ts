/* tslint:disable */
/* eslint-disable */
import { ApiErrorInquiryProjection } from './api-error-inquiry-projection';
import { InquiryProjection } from './inquiry-projection';
export interface RestApiResponseInquiryProjection {
  error?: ApiErrorInquiryProjection;
  result?: InquiryProjection;
  status?: boolean;
}

