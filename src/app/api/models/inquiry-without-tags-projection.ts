/* tslint:disable */
/* eslint-disable */
import { IEntity } from './i-entity';
import { IdNameProjection } from './id-name-projection';
export interface InquiryWithoutTagsProjection {
  answer?: string;
  callDurationInMinutes?: number;
  createdDate?: string;
  id?: number;
  isActive?: boolean;
  orgStructure?: IEntity;
  reportedByMobile?: number;
  reporterEmail?: string;
  reporterName?: string;
  reportingVia?: IdNameProjection;
  subject?: string;
  user?: IEntity;
}

