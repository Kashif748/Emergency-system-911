import { HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SharedServicesService {
  result = new HttpHeaders()
    .set('Content-Type', 'application/json')
    .set('Authorization', 'Bearer ' + localStorage.getItem('jwt'));

  constructor(private httpClient: HttpClient) {}

  getAllGroups(): Observable<any> {
    return this.httpClient
      .get<any>(`${environment.apiUrl}/groups`, { headers: this.result })
      .pipe(map((groups) => groups.result));
  }

  getAllUsers(page = 0, size = 10, search = '') {
    let params = new HttpParams()
      .append('page', (page ?? 0) + '')
      .append('size', (size ?? 10) + '')
      .append('name', search)
      .append('roleName', search);
    return this.httpClient
      .get<any>(`${environment.apiUrl}/users`, {
        headers: this.result,
        params: params,
      })
      .pipe(
        map((users) => {
          let usersList = users.result.content;
          usersList.map((item) => {
            item.nameAr = item.nameAr.replace('null', '');
            item.nameEn = item.nameEn.replace('null', '');
            return item;
          });
          return usersList;
        })
      );
  }
}
