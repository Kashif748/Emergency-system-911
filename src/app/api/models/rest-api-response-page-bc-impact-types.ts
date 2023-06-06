/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageBcImpactTypes } from './api-error-page-bc-impact-types';
import { PageBcImpactTypes } from './page-bc-impact-types';
export interface RestApiResponsePageBcImpactTypes {
  error?: ApiErrorPageBcImpactTypes;
  result?: PageBcImpactTypes;
  status?: boolean;
}

