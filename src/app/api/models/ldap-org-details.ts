/* tslint:disable */
/* eslint-disable */
import { OrgStructureDetails } from './org-structure-details';
export interface LdapOrgDetails extends OrgStructureDetails {
  ldapLoginAllowed?: boolean;
  ldapOrgId?: number;
  systemUser?: boolean;
}

