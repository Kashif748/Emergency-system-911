/* tslint:disable */
/* eslint-disable */
import { GroupUser } from './group-user';
import { OrgStructure } from './org-structure';
export interface Group {
  descAr: string;
  descEn: string;
  global?: boolean;
  id?: number;
  isActive?: boolean;
  nameAr: string;
  nameEn: string;
  orgStructure: OrgStructure;
  users?: Array<GroupUser>;
}

