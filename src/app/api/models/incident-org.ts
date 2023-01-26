/* tslint:disable */
/* eslint-disable */
import { Incident } from './incident';
import { OrgStructure } from './org-structure';
export interface IncidentOrg {
  accessGp: boolean;
  id?: number;
  incident: Incident;
  isMain: boolean;
  orgStructure: OrgStructure;
}

