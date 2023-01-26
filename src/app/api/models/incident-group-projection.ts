/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IncidentGroupDetails } from './incident-group-details';
export interface IncidentGroupProjection {
  cell?: boolean;
  group?: IncidentGroupDetails;
  id?: number;
  incident?: IEntity;
}

