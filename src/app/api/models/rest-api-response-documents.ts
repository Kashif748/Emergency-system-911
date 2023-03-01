/* tslint:disable */
/* eslint-disable */
import { ApiErrorDocuments } from './api-error-documents';
import { Documents } from './documents';
export interface RestApiResponseDocuments {
  error?: ApiErrorDocuments;
  result?: Documents;
  status?: boolean;
}

