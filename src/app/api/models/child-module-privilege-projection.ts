/* tslint:disable */
/* eslint-disable */
import { ModuleMinimumProjection } from './module-minimum-projection';
import { PrivilegeProjection } from './privilege-projection';
export interface ChildModulePrivilegeProjection {
  isEnabled?: boolean;
  modifiable?: boolean;
  module?: ModuleMinimumProjection;
  privileges?: Array<PrivilegeProjection>;
}

