import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { IAuthService } from '../services/auth.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: IAuthService) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((errorResponse: HttpErrorResponse) => {
        switch (errorResponse.status) {
          case 401: // unauthorized
            // this.authService.signOutAsync().then((_) => {
            //   this.router.navigate(["/error/403"]);
            // });
            break;
          case 400: // bad request
            break;

          case 404: // notfound
            break;
          case 403:
            break;
          case 415: // unsuported media type
            break;
          default:
            break;
        }

        return throwError(errorResponse);
      })
    );
  }
}
