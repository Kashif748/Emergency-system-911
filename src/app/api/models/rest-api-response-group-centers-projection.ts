/* tslint:disable */
/* eslint-disable */
import { ApiErrorGroupCentersProjection } from './api-error-group-centers-projection';
import { GroupCentersProjection } from './group-centers-projection';
export interface RestApiResponseGroupCentersProjection {
  error?: ApiErrorGroupCentersProjection;
  result?: GroupCentersProjection;
  status?: boolean;
}

