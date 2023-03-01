/* tslint:disable */
/* eslint-disable */
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { PrivilegeModuleProjection } from './privilege-module-projection';
export interface RoleProjection {
  desAr?: string;
  desEn?: string;
  id?: number;
  inherited?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgId?: OrgStructureMinimumProjection;
  privileges?: Array<PrivilegeModuleProjection>;
}

