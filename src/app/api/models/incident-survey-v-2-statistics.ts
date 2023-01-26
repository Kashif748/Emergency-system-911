/* tslint:disable */
/* eslint-disable */
import { IncidentSurveyStatTypes } from './incident-survey-stat-types';
export interface IncidentSurveyV2Statistics {
  configId?: number;
  nameAr?: string;
  nameEn?: string;
  totalSurveyTypes?: number;
  types?: Array<IncidentSurveyStatTypes>;
}

