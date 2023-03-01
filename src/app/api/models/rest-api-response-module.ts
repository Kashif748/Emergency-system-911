/* tslint:disable */
/* eslint-disable */
import { ApiErrorModule } from './api-error-module';
import { Module } from './module';
export interface RestApiResponseModule {
  error?: ApiErrorModule;
  result?: Module;
  status?: boolean;
}

