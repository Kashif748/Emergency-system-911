/* tslint:disable */
/* eslint-disable */
import { DailySummaryReport } from './daily-summary-report';
import { DailySummaryReportOptType } from './daily-summary-report-opt-type';
export interface DailySummaryReportOpt {
  dailySumariesReportOptType: DailySummaryReportOptType;
  dailySummariesReport: DailySummaryReport;
  description: string;
  id?: number;
}

