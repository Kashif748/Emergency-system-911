/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
export interface GroupUserProjection {
  email?: string;
  firstNameAr?: string;
  firstNameEn?: string;
  id?: number;
  isActive?: boolean;
  lastNameAr?: string;
  lastNameEn?: string;
  middleNameAr?: string;
  middleNameEn?: string;
  mobile?: string;
  orgStructure?: OrgStructureMinimumProjection;
  roles?: Array<IdNameProjection>;
}

