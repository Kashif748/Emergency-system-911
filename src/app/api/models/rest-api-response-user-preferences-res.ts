/* tslint:disable */
/* eslint-disable */
import { ApiErrorUserPreferencesRes } from './api-error-user-preferences-res';
import { UserPreferencesRes } from './user-preferences-res';
export interface RestApiResponseUserPreferencesRes {
  error?: ApiErrorUserPreferencesRes;
  result?: UserPreferencesRes;
  status?: boolean;
}

