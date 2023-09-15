/* tslint:disable */
/* eslint-disable */
import { BcWorkLogTypesProjection } from './bc-work-log-types-projection';
import { Documents } from './documents';
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
import { UserMinimunProjection } from './user-minimun-projection';
export interface BcActivityAnalysisWorkLogProjection {
  actionType?: BcWorkLogTypesProjection;
  activityAnalysis?: IEntity;
  activityAnalysisStatus?: IdNameProjection;
  attachments?: Array<Documents>;
  createdBy?: UserMinimunProjection;
  createdOn?: string;
  hasAttachments?: boolean;
  id?: number;
  isActive?: boolean;
  notes?: string;
  resource?: IEntity;
}

