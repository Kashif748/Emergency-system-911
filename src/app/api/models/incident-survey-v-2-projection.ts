/* tslint:disable */
/* eslint-disable */
import { IncidentSurveyValuesProjection } from './incident-survey-values-projection';
import { IncidentWithIncidentCategoryProjection } from './incident-with-incident-category-projection';
export interface IncidentSurveyV2Projection {
  createdDate?: string;
  id?: number;
  incident?: IncidentWithIncidentCategoryProjection;
  incidentSurveyValues?: Array<IncidentSurveyValuesProjection>;
  notes?: string;
}

