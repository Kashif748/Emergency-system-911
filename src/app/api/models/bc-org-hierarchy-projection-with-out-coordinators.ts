/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface BcOrgHierarchyProjectionWithOutCoordinators {
  bcOrgHirType?: IdNameProjection;
  id?: number;
  isActive?: boolean;
  manager?: UserIdNameProjection;
  nameAr?: string;
  nameEn?: string;
  orgStructure?: OrgStructureMinimumProjection;
  parentId?: number;
}

