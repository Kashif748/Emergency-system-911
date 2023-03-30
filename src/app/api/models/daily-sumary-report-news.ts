/* tslint:disable */
/* eslint-disable */
import { DailySummaryReport } from './daily-summary-report';
import { News } from './news';
import { NewsType } from './news-type';
export interface DailySumaryReportNews {
  dailySummariesReport: DailySummaryReport;
  description: string;
  id?: number;
  news?: News;
  newtype?: NewsType;
}

