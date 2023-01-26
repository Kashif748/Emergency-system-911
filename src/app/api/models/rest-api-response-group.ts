/* tslint:disable */
/* eslint-disable */
import { ApiErrorGroup } from './api-error-group';
import { Group } from './group';
export interface RestApiResponseGroup {
  error?: ApiErrorGroup;
  result?: Group;
  status?: boolean;
}

