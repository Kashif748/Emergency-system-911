/* tslint:disable */
/* eslint-disable */
import { ApiErrorListEntityTag } from './api-error-list-entity-tag';
import { EntityTag } from './entity-tag';
export interface RestApiResponseListEntityTag {
  error?: ApiErrorListEntityTag;
  result?: Array<EntityTag>;
  status?: boolean;
}

