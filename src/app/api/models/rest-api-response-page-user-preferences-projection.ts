/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageUserPreferencesProjection } from './api-error-page-user-preferences-projection';
import { PageUserPreferencesProjection } from './page-user-preferences-projection';
export interface RestApiResponsePageUserPreferencesProjection {
  error?: ApiErrorPageUserPreferencesProjection;
  result?: PageUserPreferencesProjection;
  status?: boolean;
}

