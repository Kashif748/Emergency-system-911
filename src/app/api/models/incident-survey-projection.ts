/* tslint:disable */
/* eslint-disable */
import { IncidentIdSubjectProjection } from './incident-id-subject-projection';
export interface IncidentSurveyProjection {
  createdDate?: string;
  happiness?: number;
  id?: number;
  incident?: IncidentIdSubjectProjection;
  other?: string;
  reason?: number;
}

