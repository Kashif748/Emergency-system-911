/* tslint:disable */
/* eslint-disable */
import { BcCycleStatus } from './bc-cycle-status';
import { OrgStructure } from './org-structure';
export interface BcCycles {
  dueDate?: string;
  id?: number;
  isActive?: boolean;
  nameAr?: string;
  nameEn?: string;
  orgStructure?: OrgStructure;
  status?: BcCycleStatus;
  versionId?: number;
  year?: number;
}

