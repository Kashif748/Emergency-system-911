/* tslint:disable */
/* eslint-disable */
import { CircularOrgProjection } from './circular-org-projection';
import { IEntity } from './i-entity';
export interface CircularWithOrgsProjection {
  confidentialty?: IEntity;
  coordinatorMail?: string;
  coordinatorMobil?: string;
  coordinatorPhone?: string;
  correspondence?: IEntity;
  createdBy?: IEntity;
  createdDate?: string;
  createdOrg?: IEntity;
  date?: string;
  id?: number;
  incident?: IEntity;
  manager?: IEntity;
  number?: string;
  orgs?: Array<CircularOrgProjection>;
  posission?: string;
  priority?: IEntity;
  procedure?: string;
  sentDate?: string;
  status?: IEntity;
  subject?: string;
}

