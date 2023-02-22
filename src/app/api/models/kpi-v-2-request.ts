/* tslint:disable */
/* eslint-disable */
import { Kpi } from './kpi';
import { KpiPriority } from './kpi-priority';
export interface KpiV2Request {
  kpi: Kpi;
  kpiPriorities: Array<KpiPriority>;
}

