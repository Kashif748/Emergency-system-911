/* tslint:disable */
/* eslint-disable */
import { ApiErrorIncidentAssetsProjection } from './api-error-incident-assets-projection';
import { IncidentAssetsProjection } from './incident-assets-projection';
export interface RestApiResponseIncidentAssetsProjection {
  error?: ApiErrorIncidentAssetsProjection;
  result?: IncidentAssetsProjection;
  status?: boolean;
}

