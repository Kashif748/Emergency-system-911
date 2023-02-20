/* tslint:disable */
/* eslint-disable */
import { EnviromentalImpact } from './enviromental-impact';
import { Incident } from './incident';
export interface IncidentEnvironmentImpact {
  enviromentalImpact: EnviromentalImpact;
  id?: number;
  incident: Incident;
}

