/* tslint:disable */
/* eslint-disable */
import { ApiErrorListBcRecoveryPriorities } from './api-error-list-bc-recovery-priorities';
import { BcRecoveryPriorities } from './bc-recovery-priorities';
export interface RestApiResponseListBcRecoveryPriorities {
  error?: ApiErrorListBcRecoveryPriorities;
  result?: Array<BcRecoveryPriorities>;
  status?: boolean;
}

