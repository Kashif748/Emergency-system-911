/* tslint:disable */
/* eslint-disable */
import { IncidentCategory } from './incident-category';
import { OrgStructure } from './org-structure';
import { Priority } from './priority';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Kpi {
  createdAt?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  deActivationDate?: string;
  descriptionAr?: string;
  descriptionEn?: string;
  id?: number;
  incidentCategory?: IncidentCategory;
  isActive?: boolean;
  nameAr: string;
  nameEn: string;
  organization?: OrgStructure;
  parentIncidentCategory?: IncidentCategory;
  period: number;
  priority?: Priority;
  referenceKpi?: Kpi;
  updatedAt?: string;
  updatedBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  version?: number;
}

