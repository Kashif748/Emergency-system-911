/* tslint:disable */
/* eslint-disable */
import { ApiErrorListInquiryWithoutTagsProjection } from './api-error-list-inquiry-without-tags-projection';
import { InquiryWithoutTagsProjection } from './inquiry-without-tags-projection';
export interface RestApiResponseListInquiryWithoutTagsProjection {
  error?: ApiErrorListInquiryWithoutTagsProjection;
  result?: Array<InquiryWithoutTagsProjection>;
  status?: boolean;
}

