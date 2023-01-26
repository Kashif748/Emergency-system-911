/* tslint:disable */
/* eslint-disable */
import { Incident } from './incident';
import { IncidentSurveyValues } from './incident-survey-values';
export interface IncidentSurveyV2 {
  createdDate?: string;
  id?: number;
  incident?: Incident;
  incidentSurveyValues?: Array<IncidentSurveyValues>;
  notes?: string;
}

