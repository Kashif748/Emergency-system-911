/* tslint:disable */
/* eslint-disable */
import { ApiErrorTaskDetails } from './api-error-task-details';
import { TaskDetails } from './task-details';
export interface RestApiResponseTaskDetails {
  error?: ApiErrorTaskDetails;
  result?: TaskDetails;
  status?: boolean;
}

