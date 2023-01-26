import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IAuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // Variables
  private AUTH_HEADER = 'Authorization';
  private DEVICE_ID = 'device-id';
  private UI_VERSION = 'ui-version';
  private OS_TYPE = 'os-type';

  private baseUrl = `${environment.apiUrl}`;
  private baseUrlV2 = `${environment.apiUrlV2}`;

  constructor(private authService: IAuthService, private router: Router) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const isNotApiRequest =
      !request.url.startsWith(this.baseUrl) &&
      !request.url.startsWith(this.baseUrlV2);
    if (isNotApiRequest) {
      // the requests that don't need authorization
      return next.handle(request);
    }
    // alwaes first thing we add session ID;
    request = this.addSessionInfo(request);

    const apiRequestNoNeedAuth =
      request.url.includes(`ext`) ||
      request.url == `${this.baseUrl}/refresh` ||
      request.url.includes(`/i18n/`);
    if (apiRequestNoNeedAuth) {
      console.log('handle it');
      return next.handle(request);
    }

    if (this.authService.isTokenExpired()) {
      // must update token before sending the request
      return this.authService.refreshToken().pipe(
        switchMap((_) => {
          request = this.addAuthorizationToken(request);
          return next.handle(request);
        })
      );
    } else {
      request = this.addAuthorizationToken(request);
      // send request don't need to update the token
      return next.handle(request);
    }
  }

  private addAuthorizationToken(request: HttpRequest<any>): HttpRequest<any> {
    // If we do not have a token yet then we should not set the header.
    // Here we could first retrieve the token from where we store it.
    const token = this.authService.accessToken;
    if (!token) {
      return request;
    }
    // If you are calling an outside domain then do not add the token.
    if (
      !request.url.startsWith(this.baseUrl) &&
      !request.url.startsWith(this.baseUrlV2)
    ) {
      return request;
    }

    return request.clone({
      headers: request.headers.set(this.AUTH_HEADER, 'Bearer ' + token),
    });
  }
  private addSessionInfo(request: HttpRequest<any>): HttpRequest<any> {
    let sesstion = this.authService.checkSessionModel();
    if (!sesstion) {
      console.log('no session info');
    }
    return request.clone({
      headers: request.headers
        .set(this.DEVICE_ID, sesstion?.deviceId)
        .set(this.OS_TYPE, sesstion?.osType)
        .set(this.UI_VERSION, sesstion?.uiVersion),
    });
  }
}
