/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentStatisticData } from './api-error-incident-statistic-data';
import { IncidentStatisticData } from './incident-statistic-data';
export interface RestApiResponseIncidentStatisticData {
  error?: ApiErrorIncidentStatisticData;
  result?: IncidentStatisticData;
  status?: boolean;
}

