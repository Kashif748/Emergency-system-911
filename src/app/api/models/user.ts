/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
import { Ranks } from './ranks';
import { UserMobile } from './user-mobile';
export interface User {
  email: string;
  emiratesId?: string;
  expireDate?: string;
  firstLogin?: boolean;
  firstNameAr: string;
  firstNameEn: string;
  id?: number;
  isActive: boolean;
  lastNameAr?: string;
  lastNameEn?: string;
  loginOtp?: string;
  middleNameAr?: string;
  middleNameEn?: string;
  mobile?: string;
  mobiles?: Array<UserMobile>;
  nameAr?: string;
  nameEn?: string;
  onDuty: boolean;
  orgStructure?: OrgStructure;
  password?: string;
  rankId?: Ranks;
  roleIds?: Array<number>;
  title?: string;
  type: string;
  upuuid?: string;
}

