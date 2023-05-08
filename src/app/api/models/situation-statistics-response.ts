/* tslint:disable */
/* eslint-disable */
import { MainCategoryStatisticsResponse } from './main-category-statistics-response';
import { RecoveryRate } from './recovery-rate';
export interface SituationStatisticsResponse {
  mainCategory?: Array<MainCategoryStatisticsResponse>;
  recoveryRate?: Array<RecoveryRate>;
  totalClosedIncidents?: number;
  totalRegisteredIncidents?: number;
}

