/* tslint:disable */
/* eslint-disable */
import { ApiErrorListIncidentSurveyConfig } from './api-error-list-incident-survey-config';
import { IncidentSurveyConfig } from './incident-survey-config';
export interface RestApiResponseListIncidentSurveyConfig {
  error?: ApiErrorListIncidentSurveyConfig;
  result?: Array<IncidentSurveyConfig>;
  status?: boolean;
}

