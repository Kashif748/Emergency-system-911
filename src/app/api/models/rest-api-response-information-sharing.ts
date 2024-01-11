/* tslint:disable */
/* eslint-disable */
import { ApiErrorInformationSharing } from './api-error-information-sharing';
import { InformationSharing } from './information-sharing';
export interface RestApiResponseInformationSharing {
  error?: ApiErrorInformationSharing;
  result?: InformationSharing;
  status?: boolean;
}

