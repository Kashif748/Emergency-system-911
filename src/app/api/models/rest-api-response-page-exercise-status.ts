/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageExerciseStatus } from './api-error-page-exercise-status';
import { PageExerciseStatus } from './page-exercise-status';
export interface RestApiResponsePageExerciseStatus {
  error?: ApiErrorPageExerciseStatus;
  result?: PageExerciseStatus;
  status?: boolean;
}

