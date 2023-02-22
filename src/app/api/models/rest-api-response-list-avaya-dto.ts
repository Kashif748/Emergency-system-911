/* tslint:disable */
/* eslint-disable */
import { ApiErrorListAvayaDto } from './api-error-list-avaya-dto';
import { AvayaDto } from './avaya-dto';
export interface RestApiResponseListAvayaDto {
  error?: ApiErrorListAvayaDto;
  result?: Array<AvayaDto>;
  status?: boolean;
}

