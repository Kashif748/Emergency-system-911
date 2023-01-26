/* tslint:disable */
/* eslint-disable */
import { ApiErrorListSharingInformationData } from './api-error-list-sharing-information-data';
import { SharingInformationData } from './sharing-information-data';
export interface RestApiResponseListSharingInformationData {
  error?: ApiErrorListSharingInformationData;
  result?: Array<SharingInformationData>;
  status?: boolean;
}

