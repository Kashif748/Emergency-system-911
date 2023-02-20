/* tslint:disable */
/* eslint-disable */
import { OrgStructure } from './org-structure';
export interface DashboardCard {
  code: string;
  id?: number;
  isActive?: boolean;
  order: number;
  orgStructure: OrgStructure;
}

