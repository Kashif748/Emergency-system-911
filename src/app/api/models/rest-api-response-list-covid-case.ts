/* tslint:disable */
/* eslint-disable */
import { ApiErrorListCovidCase } from './api-error-list-covid-case';
import { CovidCase } from './covid-case';
export interface RestApiResponseListCovidCase {
  error?: ApiErrorListCovidCase;
  result?: Array<CovidCase>;
  status?: boolean;
}

