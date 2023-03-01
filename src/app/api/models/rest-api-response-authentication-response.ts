/* tslint:disable */
/* eslint-disable */
import { ApiErrorAuthenticationResponse } from './api-error-authentication-response';
import { AuthenticationResponse } from './authentication-response';
export interface RestApiResponseAuthenticationResponse {
  error?: ApiErrorAuthenticationResponse;
  result?: AuthenticationResponse;
  status?: boolean;
}

