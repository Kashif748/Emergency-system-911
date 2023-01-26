/* tslint:disable */
/* eslint-disable */
import { ApiErrorListEntityTypeProjection } from './api-error-list-entity-type-projection';
import { EntityTypeProjection } from './entity-type-projection';
export interface RestApiResponseListEntityTypeProjection {
  error?: ApiErrorListEntityTypeProjection;
  result?: Array<EntityTypeProjection>;
  status?: boolean;
}

