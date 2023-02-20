/* tslint:disable */
/* eslint-disable */
import { ApiErrorPersonProfileType } from './api-error-person-profile-type';
import { PersonProfileType } from './person-profile-type';
export interface RestApiResponsePersonProfileType {
  error?: ApiErrorPersonProfileType;
  result?: PersonProfileType;
  status?: boolean;
}

