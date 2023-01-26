/* tslint:disable */
/* eslint-disable */
import { IdNameProjection } from './id-name-projection';
import { UserDetailsWithOrg } from './user-details-with-org';
export interface SuggestionProjection {
  createdOn?: string;
  description?: string;
  id?: number;
  stype?: string;
  suggestionStatus?: IdNameProjection;
  title?: string;
  user?: UserDetailsWithOrg;
}

