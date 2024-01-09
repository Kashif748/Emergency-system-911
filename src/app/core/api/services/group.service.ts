import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GroupService {
  private baseUrl = `${environment.apiUrl}/groups`;

  constructor(private http: HttpClient) {}

  create(group: any) {
    return this.http.post(`${this.baseUrl}`, group, {});
  }

  update(group: any) {
    return this.http.put(`${this.baseUrl}`, group, {});
  }

  getAll(name = '', page = 0, size = 10) {
    const params = new HttpParams()
      .append('name', name ?? '')
      .append('page', '' + page)
      .append('size', '' + size);
    return this.http.get<any>(`${this.baseUrl}`, { params });
  }

  getAllNonGlobal(name = '', page = 0, size = 10) {
    const params = new HttpParams()
      .append('name', name ?? '')
      .append('page', '' + page)
      .append('size', '' + size);
    return this.http.get<any>(`${this.baseUrl}/nonGlobal`, { params });
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {});
  }

  delete(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {});
  }

  getNonGlobalGroupsByOrgId(id, name = '', page = 0, size = 10, org?) {
    const params = new HttpParams()
      .append('name', name ?? '')
      .append('sort', org ?? '')
      .append('page', '' + page)
      .append('size', '' + size);
    return this.http.get<any>(`${this.baseUrl}/${id}/nonGlobal`, {
      params,
    });
  }

  getListNonGlobalGroupsByOrgId(orgId) {
    return this.http.get<any>(`${this.baseUrl}/non-global/${orgId}`);
  }
  getCategoryZoneGroups(
    categoryId: number,
    zoneId: number,
    pointLocation: string,
    contractNo: string
  ) {
    let params = new HttpParams()
      .append('category', categoryId.toString())
      .append('zone', '' + zoneId.toString())
      .append('contractNo', contractNo ?? '');

    if (pointLocation && pointLocation.length) {
      params = params.append('location', pointLocation);
    }

    return this.http.get<any>(`${environment.apiUrl}/incident-location-info`, {
      params,
    });
  }

  checkPointIntersection(location: string, categoryId: string) {
    return this.http.get<any>(
      `${environment.apiUrl}/incident-location-info?location=${location}&category=${categoryId}`
    );
  }
}
