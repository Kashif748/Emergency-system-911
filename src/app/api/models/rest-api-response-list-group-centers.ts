/* tslint:disable */
/* eslint-disable */
import { ApiErrorListGroupCenters } from './api-error-list-group-centers';
import { GroupCenters } from './group-centers';
export interface RestApiResponseListGroupCenters {
  error?: ApiErrorListGroupCenters;
  result?: Array<GroupCenters>;
  status?: boolean;
}

