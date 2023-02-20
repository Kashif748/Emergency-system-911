/* tslint:disable */
/* eslint-disable */
import { Geometry } from './geometry';
import { Incident } from './incident';
export interface IncidentReporterLocation {
  createdOn?: string;
  id?: number;
  incident: Incident;
  location?: Geometry;
}

