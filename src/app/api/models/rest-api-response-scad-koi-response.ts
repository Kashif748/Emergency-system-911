/* tslint:disable */
/* eslint-disable */
import { ApiErrorScadKoiResponse } from './api-error-scad-koi-response';
import { ScadKoiResponse } from './scad-koi-response';
export interface RestApiResponseScadKoiResponse {
  error?: ApiErrorScadKoiResponse;
  result?: ScadKoiResponse;
  status?: boolean;
}

