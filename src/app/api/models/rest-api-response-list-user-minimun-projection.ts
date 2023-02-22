/* tslint:disable */
/* eslint-disable */
import { ApiErrorListUserMinimunProjection } from './api-error-list-user-minimun-projection';
import { UserMinimunProjection } from './user-minimun-projection';
export interface RestApiResponseListUserMinimunProjection {
  error?: ApiErrorListUserMinimunProjection;
  result?: Array<UserMinimunProjection>;
  status?: boolean;
}

