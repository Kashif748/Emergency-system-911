/* tslint:disable */
/* eslint-disable */
import { ApiErrorGroupZonesProjection } from './api-error-group-zones-projection';
import { GroupZonesProjection } from './group-zones-projection';
export interface RestApiResponseGroupZonesProjection {
  error?: ApiErrorGroupZonesProjection;
  result?: GroupZonesProjection;
  status?: boolean;
}

