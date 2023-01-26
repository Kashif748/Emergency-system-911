/* tslint:disable */
/* eslint-disable */
import { ApiErrorCorrespondenceProjection } from './api-error-correspondence-projection';
import { CorrespondenceProjection } from './correspondence-projection';
export interface RestApiResponseCorrespondenceProjection {
  error?: ApiErrorCorrespondenceProjection;
  result?: CorrespondenceProjection;
  status?: boolean;
}

