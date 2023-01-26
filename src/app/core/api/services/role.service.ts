import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

import { LayoutDataService } from 'src/app/pages/layout.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RoleService {
  private baseUrl = `${environment.apiUrl}/roles`;

  constructor(
    private http: HttpClient,
    private layoutService: LayoutDataService
  ) {}

  create(role: any) {
    return this.http.post(`${this.baseUrl}`, role, {});
  }

  update(role: any) {
    return this.http.put(`${this.baseUrl}`, role, {}).pipe(
      tap(async (_) => {
        await this.layoutService.dashboardService();
      })
    );
  }

  getAll(page?: number, size?: number, sort?,data?) {
    return this.http.get<any>(`${this.baseUrl}`, {
      params: {
        sort: `${sort?.active ?? ''},${sort?.direction ?? ''}`,
        page: `${page ?? 0}`,
        inherited: data?.inherited ?? '',
        roleName: data?.roleName ?? '',
        orgName : data?.orgName??'',
        status: data?.status ?? '',
        size: `${size ?? 10}`,
      },
    });
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {});
  }

  getOrgById(id) {
    return this.http.get<any>(
      `${environment.apiUrl}/organizations/hierarchy/level/${id}`,
      {}
    );
  }

  delete(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {});
  }

  getRoleByOrgId(orgId) {
    return this.http.get<any>(
      `${environment.apiUrl}/roles/organization/${orgId}`,
      {}
    );
  }
}
