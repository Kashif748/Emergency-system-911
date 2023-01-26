/* tslint:disable */
/* eslint-disable */
import { ApiErrorExerciseType } from './api-error-exercise-type';
import { ExerciseType } from './exercise-type';
export interface RestApiResponseExerciseType {
  error?: ApiErrorExerciseType;
  result?: ExerciseType;
  status?: boolean;
}

