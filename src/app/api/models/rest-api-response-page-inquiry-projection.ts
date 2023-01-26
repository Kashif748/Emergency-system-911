/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageInquiryProjection } from './api-error-page-inquiry-projection';
import { PageInquiryProjection } from './page-inquiry-projection';
export interface RestApiResponsePageInquiryProjection {
  error?: ApiErrorPageInquiryProjection;
  result?: PageInquiryProjection;
  status?: boolean;
}

