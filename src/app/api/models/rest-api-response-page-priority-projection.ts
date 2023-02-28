/* tslint:disable */
/* eslint-disable */
import { ApiErrorPagePriorityProjection } from './api-error-page-priority-projection';
import { PagePriorityProjection } from './page-priority-projection';
export interface RestApiResponsePagePriorityProjection {
  error?: ApiErrorPagePriorityProjection;
  result?: PagePriorityProjection;
  status?: boolean;
}

