/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentsAssets } from './api-error-incidents-assets';
import { IncidentsAssets } from './incidents-assets';
export interface RestApiResponseIncidentsAssets {
  error?: ApiErrorIncidentsAssets;
  result?: IncidentsAssets;
  status?: boolean;
}

