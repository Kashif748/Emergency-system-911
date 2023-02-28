/* tslint:disable */
/* eslint-disable */
import { ApiErrorListGroupLocationGeoResponse } from './api-error-list-group-location-geo-response';
import { GroupLocationGeoResponse } from './group-location-geo-response';
export interface RestApiResponseListGroupLocationGeoResponse {
  error?: ApiErrorListGroupLocationGeoResponse;
  result?: Array<GroupLocationGeoResponse>;
  status?: boolean;
}

