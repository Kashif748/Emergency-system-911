/* tslint:disable */
/* eslint-disable */
import { AdcdaClassification } from './adcda-classification';
import { ApiErrorAdcdaClassification } from './api-error-adcda-classification';
export interface RestApiResponseAdcdaClassification {
  error?: ApiErrorAdcdaClassification;
  result?: AdcdaClassification;
  status?: boolean;
}

