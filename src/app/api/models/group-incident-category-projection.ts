/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { IncidentCategoryProjaction } from './incident-category-projaction';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
export interface GroupIncidentCategoryProjection {
  groups?: IdNameProjection;
  id?: number;
  incidentCategory?: IncidentCategoryProjaction;
  orgStructure?: OrgStructureMinimumProjection;
}

