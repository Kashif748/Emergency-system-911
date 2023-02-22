/* tslint:disable */
/* eslint-disable */
import { IncidentIdSubjectProjection } from './incident-id-subject-projection';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface IncidentWorkLogForDashboardProjection {
  auto?: boolean;
  createdBy?: UserDetailsWithOrg;
  createdOn?: string;
  id?: number;
  incident?: IncidentIdSubjectProjection;
  isActive?: boolean;
  isPublic?: boolean;
  modifiable?: boolean;
  notes?: string;
  updated?: boolean;
}

