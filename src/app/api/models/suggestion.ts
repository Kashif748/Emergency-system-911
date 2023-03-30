/* tslint:disable */
/* eslint-disable */
import { SuggestionStatus } from './suggestion-status';
import { User } from './user';
import { UserInappAuthentication } from './user-inapp-authentication';
import { UserMiddlewareAuth } from './user-middleware-auth';
export interface Suggestion {
  createdOn?: string;
  description?: string;
  id?: number;
  stype?: string;
  suggestionStatus?: SuggestionStatus;
  title?: string;
  user?: (User | UserInappAuthentication | UserMiddlewareAuth);
}

