/* tslint:disable */
/* eslint-disable */
import { GroupUserDetailsWithOrg } from './group-user-details-with-org';
import { IdProjection } from './id-projection';
export interface UserGroupProjection {
  groups?: IdProjection;
  id?: number;
  type?: number;
  user?: GroupUserDetailsWithOrg;
}

