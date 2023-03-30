/* tslint:disable */
/* eslint-disable */
import { ChildModulePrivilegeProjection } from './child-module-privilege-projection';
import { ModuleMinimumProjection } from './module-minimum-projection';
import { PrivilegeProjection } from './privilege-projection';
export interface UserModulePrivilegeProjection {
  children?: Array<ChildModulePrivilegeProjection>;
  isEnabled?: boolean;
  modifiable?: boolean;
  module?: ModuleMinimumProjection;
  privileges?: Array<PrivilegeProjection>;
}

