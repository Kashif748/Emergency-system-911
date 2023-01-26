/* tslint:disable */
/* eslint-disable */
import { ApiErrorListCommunityNameProjection } from './api-error-list-community-name-projection';
import { CommunityNameProjection } from './community-name-projection';
export interface RestApiResponseListCommunityNameProjection {
  error?: ApiErrorListCommunityNameProjection;
  result?: Array<CommunityNameProjection>;
  status?: boolean;
}

