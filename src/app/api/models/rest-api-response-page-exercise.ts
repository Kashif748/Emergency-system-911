/* tslint:disable */
/* eslint-disable */
import { ApiErrorPageExercise } from './api-error-page-exercise';
import { PageExercise } from './page-exercise';
export interface RestApiResponsePageExercise {
  error?: ApiErrorPageExercise;
  result?: PageExercise;
  status?: boolean;
}

