/* tslint:disable */
/* eslint-disable */
import { ApiErrorListModule } from './api-error-list-module';
import { Module } from './module';
export interface RestApiResponseListModule {
  error?: ApiErrorListModule;
  result?: Array<Module>;
  status?: boolean;
}

