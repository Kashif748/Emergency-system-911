/* tslint:disable */
/* eslint-disable */
import { GroupAssignee } from './group-assignee';
import { InformationType } from './information-type';
import { MissionType } from './mission-type';
import { OrgAssignee } from './org-assignee';
import { SuppliesType } from './supplies-type';
import { UserAssignee } from './user-assignee';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface TaskDetails {
  admin?: boolean;
  assignTo?: (GroupAssignee | OrgAssignee | UserAssignee);
  body?: string;
  closedDate?: string;
  createdDate?: string;
  dueDate?: string;
  featureName?: string;
  id?: number;
  incidentId?: number;
  incidentName?: string;
  location?: string;
  modifiable?: boolean;
  priorityId?: number;
  reportedByEmail?: string;
  reportedByMobile?: string;
  reportedByName?: string;
  serial?: number;
  statusId?: number;
  taskType?: (InformationType | MissionType | SuppliesType);
  title: string;
  userId?: number;
  userInfo?: UserDetailsWithOrg;
}

