/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { UserIdNameProjection } from './user-id-name-projection';
export interface IncidentReminderProjection {
  createdBy?: UserIdNameProjection;
  createdOn?: string;
  description?: string;
  id?: number;
  incident?: IEntity;
  isActive?: boolean;
  reminderDate?: string;
  status?: 'PENDING' | 'PROCESSED';
}

