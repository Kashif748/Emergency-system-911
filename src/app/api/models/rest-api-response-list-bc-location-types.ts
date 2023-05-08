/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcLocationTypes } from './api-error-list-bc-location-types';
import { BcLocationTypes } from './bc-location-types';
export interface RestApiResponseListBcLocationTypes {
  error?: ApiErrorListBcLocationTypes;
  result?: Array<BcLocationTypes>;
  status?: boolean;
}

