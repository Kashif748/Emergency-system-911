/* tslint:disable */
/* eslint-disable */
import { ApiErrorExerciseStatus } from './api-error-exercise-status';
import { ExerciseStatus } from './exercise-status';
export interface RestApiResponseExerciseStatus {
  error?: ApiErrorExerciseStatus;
  result?: ExerciseStatus;
  status?: boolean;
}

