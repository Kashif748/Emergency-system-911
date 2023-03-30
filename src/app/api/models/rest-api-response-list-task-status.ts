/* tslint:disable */
/* eslint-disable */
import { ApiErrorListTaskStatus } from './api-error-list-task-status';
import { TaskStatus } from './task-status';
export interface RestApiResponseListTaskStatus {
  error?: ApiErrorListTaskStatus;
  result?: Array<TaskStatus>;
  status?: boolean;
}

