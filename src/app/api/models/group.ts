/* tslint:disable */
/* eslint-disable */
import { GroupTypes } from './group-types';
import { GroupUser } from './group-user';
import { OrgStructure } from './org-structure';
export interface Group {
  descAr: string;
  descEn: string;
  global?: boolean;
  groupType: GroupTypes;
  id?: number;
  isActive?: boolean;
  nameAr: string;
  nameEn: string;
  orgStructure: OrgStructure;
  shiftSchedule?: string;
  users?: Array<GroupUser>;
}

