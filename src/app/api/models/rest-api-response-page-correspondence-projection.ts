/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageCorrespondenceProjection } from './api-error-page-correspondence-projection';
import { PageCorrespondenceProjection } from './page-correspondence-projection';
export interface RestApiResponsePageCorrespondenceProjection {
  error?: ApiErrorPageCorrespondenceProjection;
  result?: PageCorrespondenceProjection;
  status?: boolean;
}

