/* tslint:disable */
/* eslint-disable */
import { CorrespondenceTo } from './correspondence-to';
import { IEntity } from './i-entity';
import { IncidentIdSubjectProjection } from './incident-id-subject-projection';
import { UserDetailsWithoutPhotoOrgProjection } from './user-details-without-photo-org-projection';
export interface CorrespondenceProjection {
  body?: string;
  confidentialty?: IEntity;
  createdOn?: string;
  dueDate?: string;
  external?: boolean;
  id?: number;
  incident?: IncidentIdSubjectProjection;
  isLinkedWithCirular?: boolean;
  isRepliedByOther?: boolean;
  parent?: IEntity;
  priority?: IEntity;
  smsNotification?: boolean;
  subject?: string;
  toList?: Array<CorrespondenceTo>;
  user?: UserDetailsWithoutPhotoOrgProjection;
}

