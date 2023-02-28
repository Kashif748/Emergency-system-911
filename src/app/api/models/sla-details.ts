/* tslint:disable */
/* eslint-disable */
import { Kpi } from './kpi';
import { Priority } from './priority';
import { Sla } from './sla';
export interface SlaDetails {
  id?: number;
  kpi: Kpi;
  priority: Priority;
  sla: Sla;
  time: number;
}

