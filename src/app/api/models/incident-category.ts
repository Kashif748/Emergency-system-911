/* tslint:disable */
/* eslint-disable */
import { LocalRisk } from './local-risk';
import { OrgStructure } from './org-structure';
export interface IncidentCategory {
  chatBotEnabled?: boolean;
  id?: number;
  isActive?: boolean;
  localRisk?: LocalRisk;
  nameAr: string;
  nameEn: string;
  orgStructure?: OrgStructure;
  parent?: IncidentCategory;
  serialNumber: number;
}

