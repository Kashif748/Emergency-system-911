/* tslint:disable */
/* eslint-disable */
import { Kpi } from './kpi';
import { Priority } from './priority';
export interface KpiPriority {
  id?: number;
  kpi?: Kpi;
  period?: number;
  priority: Priority;
}

