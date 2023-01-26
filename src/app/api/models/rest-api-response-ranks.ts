/* tslint:disable */
/* eslint-disable */
import { ApiErrorRanks } from './api-error-ranks';
import { Ranks } from './ranks';
export interface RestApiResponseRanks {
  error?: ApiErrorRanks;
  result?: Ranks;
  status?: boolean;
}

