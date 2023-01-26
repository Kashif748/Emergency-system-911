/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
import { Privilege } from './privilege';
export interface Role {
  desAr?: string;
  desEn?: string;
  id?: number;
  inherited?: number;
  isActive: boolean;
  nameAr: string;
  nameEn: string;
  orgId?: OrgStructure;
  privileges?: Array<Privilege>;
}

