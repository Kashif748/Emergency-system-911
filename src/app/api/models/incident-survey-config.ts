/* tslint:disable */
/* eslint-disable */
import { IncidentSurveyType } from './incident-survey-type';
export interface IncidentSurveyConfig {
  active?: boolean;
  code?: string;
  icon?: string;
  id?: number;
  moduleId: number;
  nameAr: string;
  nameEn: string;
  types?: Array<IncidentSurveyType>;
}

