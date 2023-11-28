/* tslint:disable */
/* eslint-disable */
import { IncidentWithIncidentCategoryProjection } from './incident-with-incident-category-projection';
export interface IncidentSurveyProjection {
  createdDate?: string;
  happiness?: number;
  id?: number;
  incident?: IncidentWithIncidentCategoryProjection;
  other?: string;
  reason?: number;
}

