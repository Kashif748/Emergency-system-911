/* tslint:disable */
/* eslint-disable */
import { ApiErrorTag } from './api-error-tag';
import { Tag } from './tag';
export interface RestApiResponseTag {
  error?: ApiErrorTag;
  result?: Tag;
  status?: boolean;
}

