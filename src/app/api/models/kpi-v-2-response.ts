/* tslint:disable */
/* eslint-disable */
import { Kpi } from './kpi';
import { KpiPriority } from './kpi-priority';
export interface KpiV2Response {
  kpi: Kpi;
  kpiPriorities: Array<KpiPriority>;
}

