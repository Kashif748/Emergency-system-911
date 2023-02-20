/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageExerciseType } from './api-error-page-exercise-type';
import { PageExerciseType } from './page-exercise-type';
export interface RestApiResponsePageExerciseType {
  error?: ApiErrorPageExerciseType;
  result?: PageExerciseType;
  status?: boolean;
}

