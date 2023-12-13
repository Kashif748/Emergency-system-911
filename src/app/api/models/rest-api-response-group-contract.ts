/* tslint:disable */
/* eslint-disable */
import { ApiErrorGroupContract } from './api-error-group-contract';
import { GroupContract } from './group-contract';
export interface RestApiResponseGroupContract {
  error?: ApiErrorGroupContract;
  result?: GroupContract;
  status?: boolean;
}

