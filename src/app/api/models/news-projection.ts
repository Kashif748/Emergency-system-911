/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { NewsOrgProjection } from './news-org-projection';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface NewsProjection {
  body?: string;
  createdBy?: UserDetailsWithOrg;
  createdDate?: string;
  expireDate?: string;
  id?: number;
  isActive?: boolean;
  newsOrgs?: Array<NewsOrgProjection>;
  title?: string;
  type?: IdNameProjection;
}

