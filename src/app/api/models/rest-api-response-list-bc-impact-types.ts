/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcImpactTypes } from './api-error-list-bc-impact-types';
import { BcImpactTypes } from './bc-impact-types';
export interface RestApiResponseListBcImpactTypes {
  error?: ApiErrorListBcImpactTypes;
  result?: Array<BcImpactTypes>;
  status?: boolean;
}

