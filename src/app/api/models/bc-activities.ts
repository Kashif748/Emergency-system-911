/* tslint:disable */
/* eslint-disable */
import { BcActivityFrequencies } from './bc-activity-frequencies';
import { BcOrgHierarchy } from './bc-org-hierarchy';
import { OrgStructure } from './org-structure';
export interface BcActivities {
  activityFrequence?: BcActivityFrequencies;
  description?: string;
  externalReference?: string;
  id?: number;
  internal: boolean;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgHierarchy?: BcOrgHierarchy;
  orgStructure?: OrgStructure;
  sequenceNumber?: number;
}

