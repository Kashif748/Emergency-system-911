/* tslint:disable */
/* eslint-disable */
import { IdProjection } from './id-projection';
import { IncidentSurveyConfigProjection } from './incident-survey-config-projection';
import { IncidentSurveyTypesProjection } from './incident-survey-types-projection';
export interface IncidentSurveyValuesProjection {
  id?: number;
  incidentSurveryId?: IdProjection;
  surveyConfig?: IncidentSurveyConfigProjection;
  surveyType?: IncidentSurveyTypesProjection;
}

