/* tslint:disable */
/* eslint-disable */
import { ApiErrorBcImpactMatrixDto } from './api-error-bc-impact-matrix-dto';
import { BcImpactMatrixDto } from './bc-impact-matrix-dto';
export interface RestApiResponseBcImpactMatrixDto {
  error?: ApiErrorBcImpactMatrixDto;
  result?: BcImpactMatrixDto;
  status?: boolean;
}

