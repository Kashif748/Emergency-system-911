/* tslint:disable */
/* eslint-disable */
import { ApiErrorListUserProjection } from './api-error-list-user-projection';
import { UserProjection } from './user-projection';
export interface RestApiResponseListUserProjection {
  error?: ApiErrorListUserProjection;
  result?: Array<UserProjection>;
  status?: boolean;
}

