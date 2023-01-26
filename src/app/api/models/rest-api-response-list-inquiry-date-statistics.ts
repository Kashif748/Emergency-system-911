/* tslint:disable */
/* eslint-disable */
import { ApiErrorListInquiryDateStatistics } from './api-error-list-inquiry-date-statistics';
import { InquiryDateStatistics } from './inquiry-date-statistics';
export interface RestApiResponseListInquiryDateStatistics {
  error?: ApiErrorListInquiryDateStatistics;
  result?: Array<InquiryDateStatistics>;
  status?: boolean;
}

