/* tslint:disable */
/* eslint-disable */
import { ApiErrorListScadKoiData } from './api-error-list-scad-koi-data';
import { ScadKoiData } from './scad-koi-data';
export interface RestApiResponseListScadKoiData {
  error?: ApiErrorListScadKoiData;
  result?: Array<ScadKoiData>;
  status?: boolean;
}

