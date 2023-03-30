/* tslint:disable */
/* eslint-disable */
import { ApiErrorListDistrictNameProjection } from './api-error-list-district-name-projection';
import { DistrictNameProjection } from './district-name-projection';
export interface RestApiResponseListDistrictNameProjection {
  error?: ApiErrorListDistrictNameProjection;
  result?: Array<DistrictNameProjection>;
  status?: boolean;
}

