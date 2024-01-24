/* tslint:disable */
/* eslint-disable */
import { GroupOrganizationProjection } from './group-organization-projection';
import { GroupUserAndRolesProjection } from './group-user-and-roles-projection';
import { IdNameProjection } from './id-name-projection';
export interface GroupProjection {
  descAr?: string;
  descEn?: string;
  global?: boolean;
  groupType?: IdNameProjection;
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgStructure?: GroupOrganizationProjection;
  shiftSchedule?: string;
  users?: Array<GroupUserAndRolesProjection>;
}

