/* tslint:disable */
/* eslint-disable */
import { AdcmcCategory } from './adcmc-category';
import { LocalRisk } from './local-risk';
import { OrgStructure } from './org-structure';
export interface AssetsCategory {
  assetsMainCategory?: AdcmcCategory;
  color?: string;
  icon?: string;
  id?: number;
  isActive?: boolean;
  localRisks?: Array<LocalRisk>;
  nameAr: string;
  nameEn: string;
  organization?: OrgStructure;
}

