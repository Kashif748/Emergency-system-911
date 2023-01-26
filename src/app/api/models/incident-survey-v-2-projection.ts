/* tslint:disable */
/* eslint-disable */
import { IncidentIdSubjectAndReportingViaProjection } from './incident-id-subject-and-reporting-via-projection';
import { IncidentSurveyValuesProjection } from './incident-survey-values-projection';
export interface IncidentSurveyV2Projection {
  createdDate?: string;
  id?: number;
  incident?: IncidentIdSubjectAndReportingViaProjection;
  incidentSurveyValues?: Array<IncidentSurveyValuesProjection>;
  notes?: string;
}

