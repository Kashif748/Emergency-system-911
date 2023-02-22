/* tslint:disable */
/* eslint-disable */
import { IncidentIdSubjectProjection } from './incident-id-subject-projection';
export interface ReplyCorrInfoProjection {
  body?: string;
  incident?: IncidentIdSubjectProjection;
  parentId?: number;
  subject?: string;
  toOrg?: number;
  toUser?: number;
}

