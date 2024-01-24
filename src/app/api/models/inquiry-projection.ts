/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { InquiryTagProjection } from './inquiry-tag-projection';
import { OrgStructureMinimumProjection } from './org-structure-minimum-projection';
import { UserWithoutPhotoMinimunProjection } from './user-without-photo-minimun-projection';
export interface InquiryProjection {
  answer?: string;
  callDurationInMinutes?: number;
  createdDate?: string;
  id?: number;
  inquiryTags?: Array<InquiryTagProjection>;
  isActive?: boolean;
  orgStructure?: OrgStructureMinimumProjection;
  reportedByMobile?: number;
  reporterEmail?: string;
  reporterName?: string;
  reportingVia?: IdNameProjection;
  subject?: string;
  user?: UserWithoutPhotoMinimunProjection;
}

