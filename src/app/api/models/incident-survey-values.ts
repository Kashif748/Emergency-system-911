/* tslint:disable */
/* eslint-disable */
import { IncidentSurveyConfig } from './incident-survey-config';
import { IncidentSurveyType } from './incident-survey-type';
import { IncidentSurveyV2 } from './incident-survey-v-2';
export interface IncidentSurveyValues {
  id?: number;
  incidentSurveryId: IncidentSurveyV2;
  other?: string;
  surveyConfig: IncidentSurveyConfig;
  surveyType: IncidentSurveyType;
}

