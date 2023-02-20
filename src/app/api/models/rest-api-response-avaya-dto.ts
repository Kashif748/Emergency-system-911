/* tslint:disable */
/* eslint-disable */
import { ApiErrorAvayaDto } from './api-error-avaya-dto';
import { AvayaDto } from './avaya-dto';
export interface RestApiResponseAvayaDto {
  error?: ApiErrorAvayaDto;
  result?: AvayaDto;
  status?: boolean;
}

