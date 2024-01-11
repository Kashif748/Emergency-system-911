/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
export interface BcSectionDetails {
  designationAr?: string;
  designationEn?: string;
  email?: string;
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgStructure: OrgStructure;
  parentId?: number;
  phoneNumber?: string;
}

