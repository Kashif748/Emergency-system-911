import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Inquiry } from '../models/inquiry.model';
import { Response } from '../models/response.model';

@Injectable({
  providedIn: 'root',
})
export class InquiryService {
  constructor(private http: HttpClient) {}

  getInquiries(): Observable<Inquiry[]> {
    return this.http
      .get<Response<Inquiry[]>>(`${environment.apiUrl}/inquiry`)
      .pipe(map((v) => v.result));
  }
  getInquiriesByPage(data?, pageNumber?, pageSize?, sort?): Observable<any> {
    data = Object.assign(
      {},
      {
        ...data,
        page: pageNumber ?? '0',
        size: pageSize ?? '10',
        sort: `${sort?.active ?? 'createdDate'},${sort?.direction ?? 'desc'}`,
      }
    );
    const params = this.mapToHttpParams(data);
    return this.http.get(`${environment.apiUrl}/inquiry/search`, {
      params,
      // params: {
      //   fromDate: data?.fromDate ?? '',
      //   toDate: data?.toDate ?? '',
      //   subject: data?.subject ?? '',
      //   id: data?.id ?? '',
      //   page: pageNumber ?? '0',
      //   size: pageSize ?? '10',
      //   reporterContact: data?.reporterContact ?? '',
      //   sort: `${sort?.active ?? 'createdDate'},${sort?.direction ?? 'desc'}`,
      // },
    });
  }

  mapToHttpParams(filter: any) {
    let params = new HttpParams();
    if (filter && Object.getOwnPropertyNames(filter)?.length) {
      Object.getOwnPropertyNames(filter).forEach((prop) => {
        if (filter[prop]) {
          params = params.append(prop, filter[prop]);
        }
      });
    }
    return params;
  }

  addUpdateInquiry(body: any, method: 'POST' | 'PUT') {
    if (method === 'POST') {
      return this.http.post<any>(`${environment.apiUrl}/inquiry`, body);
    } else {
      return this.http.put<any>(`${environment.apiUrl}/inquiry`, body);
    }
  }

  getIncidentInquiry(id: string) {
    return this.http.get(`${environment.apiUrl}/inquiry/${id}`);
  }
}
