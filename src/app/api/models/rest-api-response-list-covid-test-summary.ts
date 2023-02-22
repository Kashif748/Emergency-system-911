/* tslint:disable */
/* eslint-disable */
import { ApiErrorListCovidTestSummary } from './api-error-list-covid-test-summary';
import { CovidTestSummary } from './covid-test-summary';
export interface RestApiResponseListCovidTestSummary {
  error?: ApiErrorListCovidTestSummary;
  result?: Array<CovidTestSummary>;
  status?: boolean;
}

