/* tslint:disable */
/* eslint-disable */
import { ApiErrorListGroupTypes } from './api-error-list-group-types';
import { GroupTypes } from './group-types';
export interface RestApiResponseListGroupTypes {
  error?: ApiErrorListGroupTypes;
  result?: Array<GroupTypes>;
  status?: boolean;
}

