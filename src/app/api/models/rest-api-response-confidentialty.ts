/* tslint:disable */
/* eslint-disable */
import { ApiErrorConfidentialty } from './api-error-confidentialty';
import { Confidentialty } from './confidentialty';
export interface RestApiResponseConfidentialty {
  error?: ApiErrorConfidentialty;
  result?: Confidentialty;
  status?: boolean;
}

