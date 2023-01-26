/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { ModuleProjection } from './module-projection';
export interface ModuleOrgProjection {
  allowToFollow?: boolean;
  enabled?: boolean;
  id?: number;
  module?: ModuleProjection;
  orgStructure?: IdNameProjection;
}

