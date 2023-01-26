/* tslint:disable */
/* eslint-disable */
import { ApiErrorExercise } from './api-error-exercise';
import { Exercise } from './exercise';
export interface RestApiResponseExercise {
  error?: ApiErrorExercise;
  result?: Exercise;
  status?: boolean;
}

