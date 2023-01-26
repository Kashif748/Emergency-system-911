import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export class DateInterceptor implements HttpInterceptor {
  private dateFields = [
    'createdOn',
    'incidentDate',
    'dueDate',
    'closedDate',
    'locationReachedDate',
    'containedDate',
    'createdDate',
    'logDate',
  ];

  constructor() {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method === 'POST' || request.method === 'PUT') {
      this.shiftDates(request.body);
    }
    return next.handle(request);
  }

  shiftDates(body) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (value instanceof Date || this.dateFields.includes(key)) {
        if (value) {
          const shiftedDate = new Date(value);
          body[key] = new Date(shiftedDate.toUTCString()).toISOString();
        }
      } else if (typeof value === 'object') {
        this.shiftDates(value);
      }
    }
  }

  transformIncoming(body) {
    if (body === null || body === undefined) {
      return body;
    }

    if (typeof body !== 'object') {
      return body;
    }

    for (const key of Object.keys(body)) {
      const value = body[key];
      if (this.dateFields.includes(key)) {
        body[key] = new Date(body[key] + ' GMT+4');
      } else if (typeof value === 'object') {
        this.transformIncoming(value);
      }
    }
  }
}
