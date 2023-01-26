/* tslint:disable */
/* eslint-disable */
import { ApiErrorListGroupZones } from './api-error-list-group-zones';
import { GroupZones } from './group-zones';
export interface RestApiResponseListGroupZones {
  error?: ApiErrorListGroupZones;
  result?: Array<GroupZones>;
  status?: boolean;
}

