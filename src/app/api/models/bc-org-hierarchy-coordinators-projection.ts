/* tslint:disable */
/* eslint-disable */
import { IdProjection } from './id-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface BcOrgHierarchyCoordinatorsProjection {
  id?: number;
  orgHierarchy?: IdProjection;
  user?: UserIdNameProjection;
}

