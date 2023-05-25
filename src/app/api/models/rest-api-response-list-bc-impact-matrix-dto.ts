/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcImpactMatrixDto } from './api-error-list-bc-impact-matrix-dto';
import { BcImpactMatrixDto } from './bc-impact-matrix-dto';
export interface RestApiResponseListBcImpactMatrixDto {
  error?: ApiErrorListBcImpactMatrixDto;
  result?: Array<BcImpactMatrixDto>;
  status?: boolean;
}

