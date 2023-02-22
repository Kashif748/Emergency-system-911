/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentSurvey } from './api-error-incident-survey';
import { IncidentSurvey } from './incident-survey';
export interface RestApiResponseIncidentSurvey {
  error?: ApiErrorIncidentSurvey;
  result?: IncidentSurvey;
  status?: boolean;
}

