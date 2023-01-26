/* tslint:disable */
/* eslint-disable */
import { ApiErrorCorrespondenceDashboard } from './api-error-correspondence-dashboard';
import { CorrespondenceDashboard } from './correspondence-dashboard';
export interface RestApiResponseCorrespondenceDashboard {
  error?: ApiErrorCorrespondenceDashboard;
  result?: CorrespondenceDashboard;
  status?: boolean;
}

