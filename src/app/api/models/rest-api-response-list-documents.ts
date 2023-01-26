/* tslint:disable */
/* eslint-disable */
import { ApiErrorListDocuments } from './api-error-list-documents';
import { Documents } from './documents';
export interface RestApiResponseListDocuments {
  error?: ApiErrorListDocuments;
  result?: Array<Documents>;
  status?: boolean;
}

