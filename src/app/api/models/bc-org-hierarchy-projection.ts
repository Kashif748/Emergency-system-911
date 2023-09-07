/* tslint:disable */
/* eslint-disable */
import { BcOrgHierarchyCoordinatorsProjection } from './bc-org-hierarchy-coordinators-projection';
import { IdNameProjection } from './id-name-projection';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface BcOrgHierarchyProjection {
  bcOrgHirType?: IdNameProjection;
  coordinators?: Array<BcOrgHierarchyCoordinatorsProjection>;
  id?: number;
  isActive?: boolean;
  manager?: UserIdNameProjection;
  nameAr?: string;
  nameEn?: string;
  orgStructure?: OrgStructureMinimumProjection;
  parentId?: number;
}

