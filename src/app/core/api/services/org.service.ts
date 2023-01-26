import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {map, shareReplay, tap} from 'rxjs/operators';
import {environment} from 'src/environments/environment';
import {LiquidCache, LiquidCacheService} from 'ngx-liquid-cache';
import {AppCacheKeys} from '@core/constant/AppCacheKeys';

@Injectable({
  providedIn: 'root',
})
export class OrgService {
  private baseUrl = `${environment.apiUrl}/organizations`;

  constructor(private http: HttpClient, private cache: LiquidCacheService) {
  }

  create(org: any) {
    return this.http.post(`${this.baseUrl}`, org).pipe(tap(() => {
      this.cache.remove(AppCacheKeys.ORGS);
    }));
  }

  update(org: any) {
    return this.http.put(`${this.baseUrl}`, org, {}).pipe(tap(() => {
      this.cache.remove(AppCacheKeys.ORGS);
    }));
  }

  @LiquidCache(AppCacheKeys.ORGS)
  getAll() {
    return this.http.get<any>(`${environment.apiUrl}/ext/organizations`, {}).pipe(shareReplay());
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {});
  }

  delete(id) {
    return this.http.put<any>(`${this.baseUrl}/inactive/${id}`, {}).pipe(tap(() => {
      this.cache.remove(AppCacheKeys.ORGS);
    }));
  }

  getOrgChild(id) {
    return this.http
      .get<any>(`${this.baseUrl}/hierarchy/level/${id}`, {})
      .pipe(map((org) => org.result));
  }

  getIncidentOrgs(incidentId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/incident-orgs/${incidentId}`,
      {}
    );
  }

  getOrgHorizontalImage(orgId: number) {
    return this.http.get<any>(`${environment.apiUrl}/ext/organizations/logo/${orgId}`);
  }

}
