/* tslint:disable */
/* eslint-disable */
import { GroupAssignee } from './group-assignee';
import { IEntity } from './i-entity';
import { IncidentSerialProjection } from './incident-serial-projection';
import { OrgAssignee } from './org-assignee';
import { UserAssignee } from './user-assignee';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface IncidentTaskProjection {
  assignTo?: (GroupAssignee | OrgAssignee | UserAssignee);
  body?: string;
  closedDate?: string;
  createdBy?: UserDetailsWithOrg;
  createdOn?: string;
  delayed?: boolean;
  dueDate?: string;
  featureName?: string;
  id?: number;
  incident?: IncidentSerialProjection;
  modifiable?: boolean;
  priority?: IEntity;
  status?: IEntity;
  taskType?: IEntity;
  title?: string;
  updatedBy?: IEntity;
}

