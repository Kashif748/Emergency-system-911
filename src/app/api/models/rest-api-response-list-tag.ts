/* tslint:disable */
/* eslint-disable */
import { ApiErrorListTag } from './api-error-list-tag';
import { Tag } from './tag';
export interface RestApiResponseListTag {
  error?: ApiErrorListTag;
  result?: Array<Tag>;
  status?: boolean;
}

