/* tslint:disable */
/* eslint-disable */
import { ApiErrorListVolunteersData } from './api-error-list-volunteers-data';
import { VolunteersData } from './volunteers-data';
export interface RestApiResponseListVolunteersData {
  error?: ApiErrorListVolunteersData;
  result?: Array<VolunteersData>;
  status?: boolean;
}

