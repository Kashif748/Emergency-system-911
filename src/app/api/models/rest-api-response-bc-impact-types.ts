/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcImpactTypes } from './api-error-bc-impact-types';
import { BcImpactTypes } from './bc-impact-types';
export interface RestApiResponseBcImpactTypes {
  error?: ApiErrorBcImpactTypes;
  result?: BcImpactTypes;
  status?: boolean;
}

