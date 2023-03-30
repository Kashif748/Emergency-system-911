/* tslint:disable */
/* eslint-disable */
import { ApiErrorEnviromentalImpact } from './api-error-enviromental-impact';
import { EnviromentalImpact } from './enviromental-impact';
export interface RestApiResponseEnviromentalImpact {
  error?: ApiErrorEnviromentalImpact;
  result?: EnviromentalImpact;
  status?: boolean;
}

