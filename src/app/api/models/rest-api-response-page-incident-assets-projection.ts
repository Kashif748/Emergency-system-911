/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageIncidentAssetsProjection } from './api-error-page-incident-assets-projection';
import { PageIncidentAssetsProjection } from './page-incident-assets-projection';
export interface RestApiResponsePageIncidentAssetsProjection {
  error?: ApiErrorPageIncidentAssetsProjection;
  result?: PageIncidentAssetsProjection;
  status?: boolean;
}

