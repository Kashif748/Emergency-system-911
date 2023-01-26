/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IncidentIdSubjectProjection } from './incident-id-subject-projection';
import { UserIdNameProjection } from './user-id-name-projection';
export interface OperationalReportProjection {
  confidentialty?: IEntity;
  createdBy?: UserIdNameProjection;
  createdOn?: string;
  id?: number;
  incident?: IncidentIdSubjectProjection;
  operationUpdate?: string;
  status?: IEntity;
}

