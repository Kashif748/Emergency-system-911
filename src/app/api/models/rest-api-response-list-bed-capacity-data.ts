/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBedCapacityData } from './api-error-list-bed-capacity-data';
import { BedCapacityData } from './bed-capacity-data';
export interface RestApiResponseListBedCapacityData {
  error?: ApiErrorListBedCapacityData;
  result?: Array<BedCapacityData>;
  status?: boolean;
}

