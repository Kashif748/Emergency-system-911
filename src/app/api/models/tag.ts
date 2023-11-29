/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
export interface Tag {
  id?: number;
  isActive?: boolean;
  module?: string;
  nameAr?: string;
  nameEn?: string;
  orgStructure: OrgStructure;
}

