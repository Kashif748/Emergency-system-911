/* tslint:disable */
/* eslint-disable */
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
export interface UserLogInAttemptsProjection {
  createdOn?: string;
  id?: number;
  ipAddress?: string;
  messageAr?: string;
  messageEn?: string;
  orgStructure?: OrgStructureMinimumProjection;
  status?: 'SUCCESS' | 'FAILED';
  uiVersion?: string;
  userName?: string;
}

