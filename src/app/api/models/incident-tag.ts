/* tslint:disable */
/* eslint-disable */
import { Incident } from './incident';
import { Tag } from './tag';
export interface IncidentTag {
  id?: number;
  incident: Incident;
  tag: Tag;
}

