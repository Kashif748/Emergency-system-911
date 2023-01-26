import { Injectable } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';

@Injectable()
export class ApiHelper {
  constructor() {}

  sort(pageRequest: PageRequestModel): any {
    return !pageRequest.sortField?.length
      ? ''
      : `${pageRequest.sortField},${pageRequest.sortOrder ?? 'asc'}`;
  }
  page(pageRequest: PageRequestModel): number {
    return (
      pageRequest.first / pageRequest.rows +
      (pageRequest.first % pageRequest.rows)
    );
  }
}
