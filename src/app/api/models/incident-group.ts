/* tslint:disable */
/* eslint-disable */
import { Group } from './group';
import { Incident } from './incident';
export interface IncidentGroup {
  cell?: boolean;
  group: Group;
  id?: number;
  incident: Incident;
}

