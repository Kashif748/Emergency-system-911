/* tslint:disable */
/* eslint-disable */
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
export interface UserNameDetailsWithOrgProjection {
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
  onDuty?: boolean;
  orgStructure?: OrgStructureMinimumProjection;
  photo?: string;
  title?: string;
  userName?: string;
}

