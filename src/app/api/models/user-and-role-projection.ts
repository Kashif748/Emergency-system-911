/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { RankProjection } from './rank-projection';
import { UserLdapOrgProjection } from './user-ldap-org-projection';
import { UserMobile } from './user-mobile';
export interface UserAndRoleProjection {
  email?: string;
  emiratesId?: string;
  expireDate?: string;
  firstLogin?: boolean;
  firstNameAr?: string;
  firstNameEn?: string;
  id?: number;
  isActive?: boolean;
  lastNameAr?: string;
  lastNameEn?: string;
  middleNameAr?: string;
  middleNameEn?: string;
  mobile?: string;
  mobiles?: Array<UserMobile>;
  nameAr?: string;
  nameEn?: string;
  onDuty?: boolean;
  orgStructure?: UserLdapOrgProjection;
  photo?: string;
  rankId?: RankProjection;
  roles?: Array<IdNameProjection>;
  title?: string;
  userName?: string;
}

