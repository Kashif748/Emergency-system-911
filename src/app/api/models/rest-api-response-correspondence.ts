/* tslint:disable */
/* eslint-disable */
import { ApiErrorCorrespondence } from './api-error-correspondence';
import { Correspondence } from './correspondence';
export interface RestApiResponseCorrespondence {
  error?: ApiErrorCorrespondence;
  result?: Correspondence;
  status?: boolean;
}

