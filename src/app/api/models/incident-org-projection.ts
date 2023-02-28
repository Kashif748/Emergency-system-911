/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
export interface IncidentOrgProjection {
  accessGp?: boolean;
  id?: number;
  incident?: IEntity;
  isMain?: boolean;
  orgStructure?: IdNameProjection;
}

