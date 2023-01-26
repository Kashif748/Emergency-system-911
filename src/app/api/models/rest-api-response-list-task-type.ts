/* tslint:disable */
/* eslint-disable */
import { ApiErrorListTaskType } from './api-error-list-task-type';
import { TaskType } from './task-type';
export interface RestApiResponseListTaskType {
  error?: ApiErrorListTaskType;
  result?: Array<TaskType>;
  status?: boolean;
}

