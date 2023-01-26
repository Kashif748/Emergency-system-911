/* tslint:disable */
/* eslint-disable */
import { Geometry } from './geometry';
import { GroupAssignee } from './group-assignee';
import { Incident } from './incident';
import { OrgAssignee } from './org-assignee';
import { Priority } from './priority';
import { TaskStatus } from './task-status';
import { TaskType } from './task-type';
import { User } from './user';
import { UserAssignee } from './user-assignee';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface IncidentTask {
  assignTo?: (GroupAssignee | OrgAssignee | UserAssignee);
  body?: string;
  closedDate?: string;
  createdBy?: (User | UserInappAuthentication | UserMiddlewareAuth);
  createdOn?: string;
  delayed?: boolean;
  dueDate?: string;
  featureName?: string;
  id?: number;
  incident?: Incident;
  location?: Geometry;
  modifiable?: boolean;
  nameAr?: string;
  nameEn?: string;
  priority?: Priority;
  status?: TaskStatus;
  taskType?: TaskType;
  title?: string;
}

