/* tslint:disable */
/* eslint-disable */
import { Group } from './group';
import { IncidentCategory } from './incident-category';
import { OrgStructure } from './org-structure';
export interface GroupIncidentCategory {
  groups?: Group;
  id?: number;
  incidentCategory?: IncidentCategory;
  orgStructure?: OrgStructure;
}

