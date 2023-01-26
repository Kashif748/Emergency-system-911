/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentSurveyStatistics } from './api-error-incident-survey-statistics';
import { IncidentSurveyStatistics } from './incident-survey-statistics';
export interface RestApiResponseIncidentSurveyStatistics {
  error?: ApiErrorIncidentSurveyStatistics;
  result?: IncidentSurveyStatistics;
  status?: boolean;
}

