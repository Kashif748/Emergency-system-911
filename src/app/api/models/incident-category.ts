/* tslint:disable */
/* eslint-disable */
import { LocalRisk } from './local-risk';
import { OrgStructure } from './org-structure';
export interface IncidentCategory {
  icon: string;
  chatBotEnabled?: boolean;
  icon?: string;
  id?: number;
  isActive?: boolean;
  localRisk?: LocalRisk;
  nameAr: string;
  nameEn: string;
  orgStructure?: OrgStructure;
  parent?: IncidentCategory;
  serialNumber: number;
}
