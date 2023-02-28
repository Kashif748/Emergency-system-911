/* tslint:disable */
/* eslint-disable */
import { ApiErrorTaskStatusDetails } from './api-error-task-status-details';
import { TaskStatusDetails } from './task-status-details';
export interface RestApiResponseTaskStatusDetails {
  error?: ApiErrorTaskStatusDetails;
  result?: TaskStatusDetails;
  status?: boolean;
}

