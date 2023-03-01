/* tslint:disable */
/* eslint-disable */
import { ApiErrorListRanks } from './api-error-list-ranks';
import { Ranks } from './ranks';
export interface RestApiResponseListRanks {
  error?: ApiErrorListRanks;
  result?: Array<Ranks>;
  status?: boolean;
}

