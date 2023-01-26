/* tslint:disable */
/* eslint-disable */
import { ApiErrorPersonalInfoProfile } from './api-error-personal-info-profile';
import { PersonalInfoProfile } from './personal-info-profile';
export interface RestApiResponsePersonalInfoProfile {
  error?: ApiErrorPersonalInfoProfile;
  result?: PersonalInfoProfile;
  status?: boolean;
}

