/* tslint:disable */
/* eslint-disable */
import { IncidentStatus } from './incident-status';
export interface IncidentChartFilters {
  categoryId?: number;
  centerId?: number;
  city?: number;
  createdByUser?: number;
  fromDate?: string;
  groupId?: Array<number>;
  id?: number;
  incidentSubCategory?: number;
  organization?: number;
  priority?: number;
  reportingVia?: number;
  responsibleOrg?: number;
  serial?: number;
  status?: Array<IncidentStatus>;
  subject?: string;
  tagIds?: Array<number>;
  toDate?: string;
}

