/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
export interface IncidentWithIncidentCategoryProjection {
  id?: number;
  incidentCategory?: IdNameProjection;
  incidentParentCategory?: IdNameProjection;
  reportingVia?: IdNameProjection;
  subject?: string;
}

