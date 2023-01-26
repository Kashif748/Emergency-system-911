import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { BehaviorSubject, forkJoin, Observable } from 'rxjs';
import { map, pluck, shareReplay, tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';

import { TranslationService } from '../i18n/translation.service';
import { OrganizationsService } from '../organization/organizations.service';
import { Iorganization } from '../organization/models/organization.interface';

import { GroupModel, userType } from './group.model';
import { PageEvent } from '@angular/material/paginator';
import { UrlHelperService } from '@core/services/url-helper.service';
import { GroupGeometryLocation } from './group-incidents-categroies/center.model';

@Injectable({
  providedIn: 'root',
})
export class GroupsManagementService {
  groups: GroupModel[];
  onGroupsChanged: BehaviorSubject<any>;

  lang: string;
  organizations: { [propId: number]: { nameAr: string; nameEn: string } };
  cache$: Map<string, Observable<any>>;
  constructor(
    private _httpClient: HttpClient,
    private _organization: OrganizationsService,
    private _translation: TranslationService,
    private urlHelper: UrlHelperService
  ) {
    this.onGroupsChanged = new BehaviorSubject([]);
    this.lang = this._translation.getSelectedLanguage();
    this.cache$ = new Map<string, Observable<any>>();
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    return new Promise((resolve, reject) => {
      Promise.resolve(this.getContacts()).then((files) => {
        resolve(files);
      }, reject);
    });
  }

  getContacts(): Promise<any> {
    return new Promise((resolve, reject) => {
      this._httpClient
        .get<any>(`${environment.apiUrl}/groups`, {})
        .subscribe((response: any) => {
          if (!response || response['status']) reject;
          this.groups = response['result'].content;
          this.groups = this.groups.map((contact) => {
            return new GroupModel(contact);
          });
          this.onGroupsChanged.next(this.groups);
          resolve(this.groups);
        }, reject);
    });
  }

  getAllGroups(pagination?: PageEvent, filterForm?, sort?): Observable<any> {
    return this._httpClient
      .get<any>(`${environment.apiUrl}/groups`, {
        params: {
          size: pagination?.pageSize.toString() ?? '10',
          page: pagination?.pageIndex.toString() ?? '0',
          name: filterForm?.name ?? '',
          hasMember: filterForm?.hasMembers ?? null,
          incidentCategoryId: filterForm?.incidentCategoryId ?? '',
          incidentLocation: filterForm?.incidentLocation ?? '',
          orgId: filterForm?.orgId ?? '',
        },
      })
      .pipe(
        map((res) => {
          this.groups = res['result'].content;
          this.groups = this.groups.map((contact) => {
            return new GroupModel(contact);
          });
          this.onGroupsChanged.next(this.groups);

          return res.result;
        })
      );
  }

  getGroupById(id) {
    return this._httpClient.get<any>(`${environment.apiUrl}/groups/${id}`).pipe(
      pluck('result'),
      map((res) => new GroupModel(res))
    );
  }
  getOrgs() {
    this.organizations = {} as {
      id: number;
      content: { nameAr: string; nameEn: string };
    };

    return this._organization.getAllOrgs<Iorganization[]>().pipe(
      map((data) => {
        data.forEach((org) => {
          this.organizations[org.id] = {
            nameAr: org.nameAr,
            nameEn: org.nameEn,
          };
        });
      })
    );
  }

  create(group: any) {
    const users = group['users'];

    delete group['users'];

    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`${environment.apiUrl}/groups`, group, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              let _group = new GroupModel(res['result']);
              this.addUsers(_group.id, users ?? []).subscribe(
                (data) => {
                  _group.setUsers(data);
                  this.onGroupsChanged.next(this.groups);
                },
                (err) => {
                  reject(false);
                }
              );
              this.groups.push(_group);
              this.onGroupsChanged.next(this.groups);

              resolve(_group);
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  setUsersForGroup(groupId, users) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .post(`${environment.apiUrl}/groups/${groupId}/users`, users, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              resolve(true);
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  deleteGroup(id: any) {
    return new Promise((resolve, reject) => {
      this._httpClient
        .delete(`${environment.apiUrl}/groups/${id}`, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              this.groups = this.groups.filter((item) => {
                return item.id !== id;
              });
              this.onGroupsChanged.next(this.groups);

              resolve(true);
            } else {
              reject(false);
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  removeGroupFromList(groupId) {
    this.groups = this.groups.filter((item) => item.id != groupId);
    this.onGroupsChanged.next(this.groups);
  }
  updateGroup(id: number, group: any) {
    const dataToSend = { ...group };

    const users = dataToSend['users'];

    delete dataToSend['users'];
    return new Promise((resolve, reject) => {
      this._httpClient
        .put(`${environment.apiUrl}/groups`, dataToSend, {})
        .subscribe(
          (res) => {
            if (res && res['status']) {
              let _group = new GroupModel(res['result']);
              if (_group.isActive) {
                this.groups = this.groups.map((el) => {
                  if (el.id == group.id) {
                    return _group;
                  } else {
                    return el;
                  }
                });
              } else {
                this.groups = this.groups.filter((e) => e.id != _group.id);
              }
              if (_group.isActive) {
                resolve(_group);
              }
              // this.updateUsers(_group.id, users ?? []).subscribe(
              //   (data) => {
              //     _group.setUsers(data);
              //     this.onGroupsChanged.next(this.groups);

              //     resolve(_group);
              //   },
              //   (err) => {
              //     reject(false);
              //   }
              // );
              else {
                this.onGroupsChanged.next(this.groups);
                resolve(this.groups);
              }
            } else {
              reject(false);
            }
          },
          (err) => {
            reject(err);
          }
        );
    });
  }

  getById(id: number) {
    return this.groups.find((item) => item.id == id);
  }

  getGroupsUsers(groupId: any): Observable<any[]> {
    const headers = new HttpHeaders().set(
      'size',
      Number.MAX_SAFE_INTEGER.toString()
    );
    return this._httpClient
      .get(`${environment.apiUrl}/groups/${groupId}/users`, { headers })
      .pipe(pluck('result'), pluck('content'));
  }

  updateGroupUsers(groupId: number, data: any) {
    return this._httpClient.put(
      `${environment.apiUrl}/groups/${groupId}/users`,
      data,
      {}
    );
  }
  updateGroupManager(groupId: number, data: any) {
    data.user = data.user?.id;
    return this._httpClient.put(
      `${environment.apiUrl}/groups/${groupId}/users/manager`,
      data,
      {}
    );
  }

  updateGroupUsersLocal(group) {
    this.groups = this.groups.map((el) => {
      if (el.id == group.id) {
        return group;
      } else {
        return el;
      }
    });
    this.onGroupsChanged.next(this.groups);
  }
  addGroupUsers(groupId: number, data: any) {
    return this._httpClient.post(
      `${environment.apiUrl}/groups/${groupId}/users`,
      data,
      {}
    );
  }

  updateUsers(groupId: number, users: any[]) {
    users = this.initUsersObj(users);
    return this.updateGroupUsers(groupId, users).pipe(
      map((res) => res['result'])
    );
  }

  addUsers(groupId: any, users: any[]) {
    users = this.initUsersObj(users);
    return this.addGroupUsers(groupId, users).pipe(map((res) => res['result']));
  }

  initUsersObj(users: any[]) {
    // remember always last item is the  manager for the group
    return users?.map((user, index) => {
      return {
        id: 0,
        type: index + 1 == users.length ? userType.MANAGER : userType.MEMBER,
        user: {
          id: user,
        },
      };
    });
  }

  getGroupCenters(groupId) {
    return this._httpClient
      .get(`${environment.apiUrl}/groups/${groupId}/centers`)
      .pipe(map((data) => data['result']?.centers));
  }

  getGroupZones(groupId) {
    return this._httpClient
      .get(`${environment.apiUrl}/groups/${groupId}/zones`)
      .pipe(map((data) => data['result']?.zones));
  }

  getGroupCategories(groupId): Observable<any> {
    return this._httpClient
      .get(`${environment.apiUrl}/groups/${groupId}/incident-category`)
      .pipe(map((data) => data['result']?.content));
  }

  getCenterZones(centerId) {
    return this._httpClient.get(
      `${environment.apiUrl}/service-center-area/district-list?centerId=${centerId}`,
      {}
    );
  }
  setGroupsCenters(groupId, centers) {
    return this._httpClient.put(
      `${environment.apiUrl}/groups/${groupId}/centers`,
      centers
    );
  }

  setGroupZones(groupId, zones) {
    return this._httpClient.put(
      `${environment.apiUrl}/groups/${groupId}/zones`,
      zones
    );
  }

  setGroupCategoris(groupId, incidentCategories) {
    return this._httpClient.put(
      `${environment.apiUrl}/groups/${groupId}/incident-category`,
      incidentCategories
    );
  }

  getIncidentsLocationInfo(groupId, refresh?: boolean) {
    if (this.cache$.has(`incident-location-info/${groupId}`) && !refresh) {
      return this.cache$.get(`incident-location-info/${groupId}`);
    } else {
      let observable = this._httpClient
        .get(`${environment.apiUrl}/incident-location-info/${groupId}`)
        .pipe(
          map((data) => data['result']),
          shareReplay(1)
        );

      this.cache$.set(`incident-location-info/${groupId}`, observable);
      return observable;
    }
    return this._httpClient
      .get(`${environment.apiUrl}/incident-location-info/${groupId}`)
      .pipe(
        map((data) => data['result']),
        shareReplay(1)
      );
  }

  setIncidentsLocationInfo(body, isAddMode: boolean) {
    if (isAddMode)
      return this._httpClient.post(
        `${environment.apiUrl}/incident-location-info`,
        body
      );
    else {
      return this._httpClient.put(
        `${environment.apiUrl}/incident-location-info`,
        body
      );
    }
  }

  downloadReport(exportAs: 'PDF' | 'EXCEL', filterForm?) {
    const headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    return this._httpClient
      .get<any>(`${environment.apiUrl}/groups/export`, {
        params: {
          as: exportAs,
          lang: (this.lang == 'ar') + '',
          name: filterForm?.name ?? '',
          hasMember: filterForm?.hasMembers ?? null,
          incidentCategoryId: filterForm?.incidentCategoryId ?? '',
          incidentLocation: filterForm?.incidentLocation ?? '',
          orgId: filterForm?.orgId ?? '',
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

  createGroupGeometryLocation(body: GroupGeometryLocation) {
    return this._httpClient.post(
      `${environment.apiUrl}/group-geometry-location`,
      body
    );
  }

  updateGroupGeometryLocation(body: GroupGeometryLocation) {
    return this._httpClient.put(
      `${environment.apiUrl}/group-geometry-location`,
      body
    );
  }

  getGroupGeometryLocation(groupId: number) {
    return this._httpClient.get(
      `${environment.apiUrl}/group-geometry-location/${groupId}`
    );
  }
}
