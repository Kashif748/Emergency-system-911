/* tslint:disable */
/* eslint-disable */
import { IncidentTaskIdAndTitleProjection } from './incident-task-id-and-title-projection';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface TaskWorkLogForDashboardProjection {
  auto?: boolean;
  createdBy?: UserDetailsWithOrg;
  createdOn?: string;
  id?: number;
  isActive?: boolean;
  modifiable?: boolean;
  notes?: string;
  taskId?: IncidentTaskIdAndTitleProjection;
  updated?: boolean;
}

