import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { UrlHelperService } from '@core/services/url-helper.service';

import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

import { LayoutDataService } from 'src/app/pages/layout.service';
import { environment } from 'src/environments/environment';

import { OrgService } from './org.service';

@Injectable({
  providedIn: 'root',
})
export class UserService implements Resolve<any> {
  constructor(
    private http: HttpClient,
    private orgService: OrgService,
    private layoutService: LayoutDataService,
    private translationService: TranslationService,
    private urlHelper: UrlHelperService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }
  private baseUrl = `${environment.apiUrl}/users`;

  lang: string;

  private loadingSubject = new BehaviorSubject<boolean>(false);

  public loading$ = this.loadingSubject.asObservable();

  onPaginationConfigChange: BehaviorSubject<any> = new BehaviorSubject({});

  usersList: any[] = [];
  onUsersListChange: BehaviorSubject<any[]> = new BehaviorSubject([]);

  organizations: { [propId: number]: { nameAr: string; nameEn: string } } = {};

  create(user: any) {
    return this.http.post(`${this.baseUrl}/new`, user, {});
  }

  update(id: string, user: any) {
    return this.http.put(`${this.baseUrl}/${id}/new`, user, {}).pipe(
      tap(async (_) => {
        await this.layoutService.dashboardService();
      })
    );
  }

  getAll(name = '', page = 0, size = 10, privilege?) {
    return this.http
      .get<any>(
        `${
          privilege
            ? `${environment.apiUrl}/privileges/${privilege}/users`
            : this.baseUrl
        }`,
        {
          params: {
            page: `${page ?? 0}`,
            size: `${size ?? 10}`,
            name: name ?? '',
          },
        }
      )
      // .pipe(
      //   map((result) => {
      //     const usersList = result.result.content ?? result.result;
      //     usersList.map((item) => {
      //       item.nameAr = item.nameAr.replace('null', '');
      //       item.nameEn = item.nameEn.replace('null', '');
      //       return item;
      //     });
      //     return usersList;
      //   })
      // );
  }

  filterUsers(filter: string) {
    const params = new HttpParams().append('filter', filter);
    return this.http
      .get<any>(`${environment.apiUrl}/users`, { params })
      .pipe(map((users) => users.result.content));
  }

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {});
  }

  delete(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`, {});
  }

  activate(id) {
    return this.http.put(`${this.baseUrl}/activate-user/${id}`, {});
  }

  // new

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.loadingSubject.next(true);

    return new Promise((resolve, reject) => {
      this.getAllProfiles(10, 0).then((users) => {
        resolve(users);
        this.loadingSubject.next(false);
      });
    });
  }

  updateProfile(id: string, user: any) {
    return this.http.put(`${this.baseUrl}/update-user/${id}`, user, {});
  }

  getGeneralRoles() {
    return this.http.get<any>(`${environment.apiUrl}/roles`, {});
  }

  getRelatedOrges() {
    return this.orgService
      .getAll()
      .pipe(
        map((r) => r.result),
        map((data) => {
          data.forEach((org) => {
            this.organizations[org.id] = {
              nameAr: org.nameAr,
              nameEn: org.nameEn,
            };
          });
          return data;
        })
      )
      .toPromise();
  }

  uploadFile(file, userId, tagId) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post(environment.apiUrl + '/dms/upload', formData, {
      params: { recordId: userId, tagId },
    });
  }

  userFiles(userId, tagId) {
    return this.http.get<any>(`${environment.apiUrl}/dms/tag`, {
      params: { entityId: userId, entityLabel: 'User', entityTagId: tagId },
    });
  }

  getAllProfiles(pageSize?, pageNumber?, data?, sort?: any) {
    this.loadingSubject.next(true);
    return this.http
      .get<any>(`${environment.apiUrl}/users/all-user-profile`, {
        params: {
          size: pageSize ?? '10',
          page: pageNumber ?? '0',
          name: data?.name ?? '',
          userName: data?.userName ?? '',
          orgName: data?.orgName ?? '',
          emiratesId: data?.emiratesId ?? '',
          roleName: data?.roleName ?? '',
          sort: `${sort?.active ?? ''},${sort?.direction ?? ''}`,
        },
      })
      .pipe(
        map((data) => {
          this.onPaginationConfigChange.next({
            itemsPerPage: pageSize,
            currentPage: pageNumber,
            totalItems: data.result.totalElements,
          });

          this.usersList = data.result.content;
          this.usersList = this.usersList.map((item) => {
            // const org = this.organizations[item['orgStructure']['id']];
            // item['orgStructure']['nameEn'] = org?.nameEn;
            // item['orgStructure']['nameAr'] = org?.nameAr;
            item.nameAr = item.nameAr.replace('null', '');
            item.nameEn = item.nameEn.replace('null', '');
            return item;
          });

          this.onUsersListChange.next(this.usersList);
          this.loadingSubject.next(false);
          return this.usersList;
        }),
        catchError((err) => {
          this.loadingSubject.next(false);
          return throwError(err);
        })
      )
      .toPromise();
  }

  getUserRank() {
    return this.http.get<any>(`${environment.apiUrl}/ranks`, {});
  }

  importUserReport(file) {
    return this.http
      .post(`${environment.apiUrl}/users/import`, {
        file,
      })
      .pipe(
        tap((res) => {
          const newBlob = new Blob(['res'], {
            type: `multipart/form-data`,
          });
          this.urlHelper.downloadBlob(newBlob);
        })
      );
  }

  uploadExcel(formData: FormData) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    const httpOptions = { headers };
    return this.http.post(
      `${environment.apiUrl}/users/import`,
      formData,
      httpOptions
    );
  }

  downloadReport(exportAs: 'PDF' | 'EXCEL', filterForm?) {
    return this.http
      .get<any>(`${environment.apiUrl}/users/export`, {
        params: {
          as: exportAs,
          lang: (this.lang == 'ar') + '',
          name: filterForm?.name ?? '',
          userName: filterForm?.userName ?? '',
          orgName: filterForm?.orgName ?? '',
          EId: filterForm?.EId ?? '',
        },

        responseType: 'blob' as any,
      })
      .pipe(
        tap((res) => {
          const newBlob = new Blob([res], {
            type: `application/${
              exportAs === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(newBlob);
        })
      );
  }

  getAllUsersOfOrganization(name: string, pageNumber: number) {
    return this.http.get(
      `${this.baseUrl}/all-users?name=${name}&page=${pageNumber}&sort=firstNameEn,desc`
    );
  }
  getAllUserOfOrgAndSubOrg(pageSize?, pageNumber?, data?, sort?: any) {
    this.loadingSubject.next(true);
    return this.http
      .get<any>(`${environment.apiUrl}/users/all-user-profile`, {
        params: {
          size: pageSize ?? '10',
          page: pageNumber ?? '0',
          name: data?.name ?? '',
          userName: data?.userName ?? '',
          orgName: data?.orgName ?? '',
          emiratesId: data?.emiratesId ?? '',
          roleName: data?.roleName ?? '',
          sort: `${sort?.active ?? ''},${sort?.direction ?? ''}`,
        },
      });
  }
}
