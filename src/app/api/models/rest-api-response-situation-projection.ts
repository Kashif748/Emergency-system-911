/* tslint:disable */
/* eslint-disable */
import { ApiErrorSituationProjection } from './api-error-situation-projection';
import { SituationProjection } from './situation-projection';
export interface RestApiResponseSituationProjection {
  error?: ApiErrorSituationProjection;
  result?: SituationProjection;
  status?: boolean;
}

