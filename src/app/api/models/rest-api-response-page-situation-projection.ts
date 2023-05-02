/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageSituationProjection } from './api-error-page-situation-projection';
import { PageSituationProjection } from './page-situation-projection';
export interface RestApiResponsePageSituationProjection {
  error?: ApiErrorPageSituationProjection;
  result?: PageSituationProjection;
  status?: boolean;
}

