import {
  HttpClient,
  HttpHeaders,
  HttpParams,
  HttpResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Resolve,
  RouterStateSnapshot,
} from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { TranslationService } from '../../../modules/i18n/translation.service';
import {
  BedModal,
  DohModal,
  EventInfoModal,
} from '../../../modules/incidents/doh-dashboard/doh-modal';
import { AlertsService } from './alerts.service';
import { UploadTagIdConst } from '@core/constant/UploadTagIdConst';
import {IpaginationResponce} from "../../../modules/news/models/paginationResponce";

@Injectable({
  providedIn: 'root',
})
export class IncidentsService implements Resolve<any> {
  // Variables
  responsibleOrgsChange: BehaviorSubject<any>;
  lang = 'en';
  routeParams: any;
  dohData: DohModal[] = [];
  onDohDataChange: BehaviorSubject<any>;
  bedData: BedModal[] = [];
  onBedDataChange: BehaviorSubject<any>;
  sharedData: EventInfoModal[] = [];
  onSharedDataChange: BehaviorSubject<any>;
  kpiInfo: any[] = [];
  Hospitals: any[] = [];
  onHospitalsChange: BehaviorSubject<any>;

  constructor(
    private http: HttpClient,
    private alertService: AlertsService,
    private translationService: TranslationService
  ) {
    this.responsibleOrgsChange = new BehaviorSubject([]);
    this.onDohDataChange = new BehaviorSubject([]);
    this.onBedDataChange = new BehaviorSubject([]);
    this.onSharedDataChange = new BehaviorSubject([]);
    this.onHospitalsChange = new BehaviorSubject([]);
    this.lang = this.translationService.getSelectedLanguage();
  }

  sendOperationalReport(id: any, userId: any) {
    return this.http.get(
      `${environment.apiUrl}/operational-reports/send/${id}?userId=${userId}`
    );
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> | Promise<any> | any {
    this.routeParams = route.params;
    return new Promise((resolve, reject) => {
      Promise.all([
        //  this.getVolunteers(),
        //   this.getBedCapacity(),
        //   this.getSharedInfo(),
      ]).then(
        ([...files]) => {
          resolve(files);
        },
        (err) => {
          reject(err);
        }
      );
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

  getTaskCountByStatus(incidentId, statusId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/tasks/status?incidentId=${incidentId}&statusId=${statusId}`
      )
      .pipe(map((r) => r.result));
  }

  getIncidents(
    page: number,
    sort?: { active: string; direction: 'asc' | 'desc' }
  ) {
    let httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', '10');
    if (sort) {
      httpParams = httpParams.append(
        'sort',
        sort.active + ',' + sort.direction
      );
    }
    return this.http
      .get<any>(`${environment.apiUrl}/incidents`, {
        params: httpParams,
      })
      .pipe((incidents) => {
        return incidents;
      });
  }

  getIncidentsByFilterQuery(
    page,
    search,
    sort?: { active: string; direction: 'asc' | 'desc' },
    size = 10
  ) {
    let httpParams = new HttpParams();
    httpParams = httpParams
      .append('createdDate', search.desc ?? '')
      .append('description', search.desc ?? '')
      .append('emergencylevel', search.emergencyLevels ?? '')
      .append('fromDate', search.createdDate ?? '')
      .append('id', search.sr ?? '')
      .append('serial', search.serial ?? '')
      .append('priority', search.priority ?? '')
      .append('status', search.status ?? '')
      .append('subject', search.subject ?? '')
      .append('filterKpi', search.filterKpi ?? '')
      .append('isKpiExpired', search.isKpiExpired ?? '')
      .append('toDate', search.endDate ?? '')
      .append('page', page)
      .append('size', `${size ?? 10}`);

    if (sort) {
      httpParams = httpParams.append(
        'sort',
        sort.active + ',' + sort.direction
      );
    }

    return this.http.get<any>(`${environment.apiUrl}/incidents/search`, {
      params: httpParams,
    });
  }

  getIncidentsIds(
    page,
    search,
    sort?: { active: string; direction: 'asc' | 'desc' },
    size = 10
  ) {
    let httpParams = new HttpParams();
    httpParams = httpParams
      .append('createdDate', search.desc ?? '')
      .append('categoryId', search.categoryId ?? '')
      .append('centerId', search.centerId ?? '')
      .append('description', search.desc ?? '')
      .append('emergencylevel', search.emergencyLevels ?? '')
      .append('fromDate', search.createdDate ?? '')
      .append('id', search.sr ?? '')
      .append('priority', search.priority ?? '')
      .append('status', search.status ?? '')
      .append('subject', search.subject ?? '')
      .append('filterKpi', search.filterKpi ?? '')
      .append('isKpiExpired', search.isKpiExpired ?? '')
      .append('toDate', search.endDate ?? '')
      .append('page', page)
      .append('size', `${size ?? 10}`);

    if (sort) {
      httpParams = httpParams.append(
        'sort',
        sort.active + ',' + sort.direction
      );
    }

    return this.http.get<any>(
      `${environment.apiUrl}/incidents/search/list-ids`,
      {
        params: httpParams,
      }
    );
  }

  getIncidentOrgs(incidentId) {
    return this.http.get<any>(
      `${environment.apiUrl}/incident-orgs/${incidentId}`,
      {}
    );
  }

  getAllIncidents() {
    return this.http
      .get<any>(`${environment.apiUrl}/incidents`)
      .pipe((incidents) => {
        return incidents;
      });
  }

  getInterimIncidents(pageNumber: number = 0, size: number = 10) {
    return this.http.get<any>(
      `${environment.apiUrl}/interim-incidents?page=${(
        pageNumber - 1
      ).toString()}&size=${size.toString()}`
    );
  }
  // getInterimIncidents() {
  //   return this.http.get<any>(`${environment.apiUrl}/interim-incidents`);
  // }

  // searchInterimIncidents(page, search, size = 10) {
  //   let httpParams = new HttpParams();
  //   httpParams = httpParams
  //     .append('desc', search?.subject ?? '')
  //     .append('reporterContact', search?.reporterMobile ?? '')
  //     .append('reportingVia', search?.rVia ?? '')
  //     .append('status', search?.status ?? '')
  //     .append('desc', search.subject ?? '')
  //     .append('reporterContact', search.reporterMobile ?? '')
  //     .append('reportingVia', search.rVia ?? '')
  //     .append('status', search.status ?? '')
  //     .append('page', page)
  //     .append('size', `${size ?? 10}`)
  //     .append('sort', 'createdOn,desc')

  //     .append('size', `${size ?? 10}`);

  //   return this.http.get<any>(
  //     `${environment.apiUrl}/interim-incidents/search`,
  //     {
  //       params: httpParams,
  //     }
  //   );
  // }

  searchInterimIncidents(page, search, size = 10, sort?: any) {
    const params = new HttpParams()
      .append('rVia', search?.rVia ?? '')
      .append('reporterMobile', search?.reporterMobile ?? '')
      .append('status', search?.status ?? '')
      .append('subject', search?.subject ?? '')
      .append('size', `${size ?? 10}`)
      .append('page', page)
      .append('sort', sort ?? 'createdOn,desc')
    return this.http.get<any>(
      `${environment.apiUrl}/interim-incidents/search`,{params}
    );
  }

  viewInterimIncidents(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/interim-incidents/${id}`)
      .pipe((incident) => {
        return incident;
      });
  }

  updateInterimStatus(id, reason) {
    return this.http
      .put<any>(`${environment.apiUrl}/interim-incidents/decline/${id}`, reason)
      .pipe((status) => {
        return status;
      });
  }

  shareViaMail(incidentId: number, body: any) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/incidents/${incidentId}/share-via-mail`,
        body
      )
      .pipe((email) => {
        return email;
      });
  }

  viewIncidents(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/incidents/${id}`)
      .pipe((incident) => {
        return incident;
      });
  }

  getIncidentCategory(categoryId: number) {
    return this.http
      .get<any>(`${environment.apiUrl}/incident-categories/${categoryId}`)
      .pipe((categories) => {
        return categories;
      });
  }

  getIncidentCategories() {
    return this.http
      .get<any>(`${environment.apiUrl}/incident-categories`)
      .pipe((categories) => {
        return categories;
      });
  }

  getIncidentSubCategories(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/incident-categories/${id}/children`)
      .pipe((categories) => {
        return categories;
      });
  }

  getKpis(categoryId: any = '', priorityId: any = '') {
    return this.http
      .get<any>(
        `${environment.apiUrlV2}/kpis/find?incidentCategory=${categoryId}&priorityId=${priorityId}`
      )
      .pipe((categories) => {
        return categories;
      });
  }

  getKpiById(kpiId: number) {
    const stgUrl1 = `${environment.apiUrlV2}/kpis/${kpiId}`;

    return this.http.get<any>(stgUrl1).pipe((categories) => {
      return categories;
    });
    return this.http.get<any>(stgUrl1).pipe((categories) => {
      return categories;
    });
    return this.http.get<any>(stgUrl1).pipe((categories) => {
      return categories;
    });
  }

  getIncidentStatus() {
    return this.http
      .get<any>(`${environment.apiUrl}/incident-statuses`)
      .pipe((categories) => {
        return categories;
      });
  }

  getEmergencyLevels() {
    return this.http
      .get<any>(`${environment.apiUrl}/emergency-levels`)
      .pipe((levels) => {
        return levels;
      });
  }

  getIncidentReasons() {
    return this.http
      .get<any>(`${environment.apiUrl}/reasons`)
      .pipe((reasons) => {
        return reasons;
      });
  }

  getIncidentGroups() {
    return this.http
      .get<any>(`${environment.apiUrl}/emergency-levels`)
      .pipe((groups) => {
        return groups;
      });
  }

  getPriorities() {
    return this.http
      .get<any>(`${environment.apiUrl}/priorities`)
      .pipe((priorities) => {
        return priorities;
      });
  }

  getAssets(id?) {
    return this.http.get<any>(`${environment.apiUrl}/assets?orgId=${id}`).pipe((assets) => {
      return assets;
    });
  }

  getIncidentsAssets(incidentID) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/incident-assets/search?incidentId=${incidentID}&size=1000`
      )
      .pipe((assets) => {
        return assets;
      });
  }

  getAssetsByCategoryId(orgId, category = null, pageNumber = 0, pageSize = 10) {
    let params: any = { orgId, page: pageNumber, size: pageSize };

    if (category.id) {
      params = { ...params, categoryId: category.id };
    }
    return this.http
      .get<any>(`${environment.apiUrl}/assets/search`, {
        params,
      })
      .pipe((assets) => {
        return assets;
      });
  }

  getEnvironmentalImpacts() {
    return this.http
      .get<any>(`${environment.apiUrl}/enviromental-impacts`)
      .pipe((impacts) => {
        return impacts;
      });
  }

  getGeneralPosition(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/incidents/gp/${id}`)
      .pipe(map((r) => r.result));
  }

  getReportingVia() {
    return this.http
      .get<any>(`${environment.apiUrl}/reporting-via`)
      .pipe((report) => {
        return report;
      });
  }

  createIncident(body) {
    return this.http
      .post<any>(`${environment.apiUrl}/incidents`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  createOperationalReports(body) {
    return this.http
      .post<any>(`${environment.apiUrl}/operational-reports`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  operationalReportFiles(id) {
    const uploadHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/pdf'
    );

    return this.http
      .get<Blob>(`${environment.apiUrl}/operational-reports/review/${id}`, {
        headers: uploadHeaders,
        responseType: 'blob' as 'json',
        observe: 'response',
      })
      .pipe((incident) => {
        return incident;
      });
  }

  uploadIncidentFiles(IncidentId, formData) {
    // TODO: Validate that this code works after remove headers and working with interceptor and not add content-type
    return this.http
      .post<any>(
        `${environment.apiUrl}/dms/upload/?recordId=${IncidentId}&tagId=1`,
        formData
      )
      .pipe((incident) => {
        return incident;
      });
  }

  uploadIncidentWorkLogFiles(WLId, formData) {
    // TODO: Validate that this code works after remove headers and working with interceptor and not add content-type
    return this.http
      .post<any>(
        `${environment.apiUrl}/dms/upload/?recordId=${WLId}&tagId=2`,
        formData
      )
      .pipe((incident) => {
        return incident;
      });
  }

  uploadTaskFiles(taskId, formData) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/dms/upload/?recordId=${taskId}&tagId=4`,
        formData
      )
      .pipe((incident) => {
        return incident;
      });
  }

  uploadTaskWorkLogFiles(taskWLId, formData) {
    return this.http
      .post<any>(
        `${environment.apiUrl}/dms/upload/?recordId=${taskWLId}&tagId=6`,
        formData
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getIncidentFiles(IncidentId) {
    console.trace();
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${IncidentId}&entityTagId=1`
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getInterimIncidentFiles(InterimId) {
    console.trace();
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${InterimId}&entityTagId=28`
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getIncidentWorkLogFiles(IncidentWLId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${IncidentWLId}&entityTagId=` +
          UploadTagIdConst.WORK_LOG
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getTaskFiles(taskId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${taskId}&entityTagId=` +
          UploadTagIdConst.TASK_WORK_LOG
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getTaskWorkLogFiles(taskWLId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${taskWLId}&entityTagId=` +
          UploadTagIdConst.TASK
      )
      .pipe((incident) => {
        return incident;
      });
  }

  downloadFiles(id) {
    return this.http
      .get<Blob>(`${environment.apiUrl}/dms/load/${id}`, {
        responseType: 'blob' as 'json',
        observe: 'response',
      })
      .pipe((incident) => {
        return incident;
      });
  }

  updateIncident(body) {
    return this.http
      .put<any>(`${environment.apiUrl}/incidents`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  updateIncidentStatus(body: {
    incidentId: number;
    statusId: number;
    finalStatement: string;
  }) {
    return this.http
      .put<any>(`${environment.apiUrl}/incidents/closeIncident/`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  updateIncidentLocationDateInfo(incidentId: number, body: any) {
    return this.http.put<any>(
      `${environment.apiUrl}/incidents/${incidentId}`,
      body
    );
  }

  updateIncidentHospitalStatistics(incidentId: number, body: any[]) {
    return this.http.put<any>(
      `${environment.apiUrl}/incident-hospitals/${incidentId}`,
      body
    );
  }

  getIncidentHospitalStatistics(incidentId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/incident-hospitals/${incidentId}`
    );
  }

  // Incident WorkLOgs Apis
  addWorkLog(id, body) {
    return this.http
      .post<any>(`${environment.apiUrl}/incidents/${id}/logs`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  updateWorkLog(id, body, type: 'task' | 'incident') {
    return this.http
      .put<any>(
        `${environment.apiUrl}/${type}s/${id}/logs/${
          type == 'task' ? body.id : ''
        }`,
        body
      )
      .pipe((incident) => {
        return incident;
      });
  }

  deleteWorkLog(id, body, type: 'task' | 'incident') {
    return this.http
      .put<any>(
        `${environment.apiUrl}/${type}s/${id}/logs/inactive/${body.id}`,
        body
      )
      .pipe((incident) => {
        return incident;
      });
  }

  addTaskWorkLog(id, body) {
    return this.http
      .post<any>(`${environment.apiUrl}/tasks/${id}/logs`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  updateTaskWorkLog(id, body) {
    return this.http
      .put<any>(`${environment.apiUrl}/tasks/${id}/logs`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  getWorkLogs(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/incidents/${id}/logs`)
      .pipe((tasks) => {
        return tasks;
      });
  }

  getTaskWorkLogs(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/tasks/${id}/logs`)
      .pipe((tasks) => {
        return tasks;
      });
  }

  getOperationalReports(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/operational-reports?incidentId=${id}`)
      .pipe((op) => {
        return op;
      });
  }

  getSerials(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/operational-reports/serial/${id}`)
      .pipe((op) => {
        return op;
      });
  }

  // Task Apis //
  createTask(body) {
    return this.http
      .post<any>(`${environment.apiUrl}/tasks`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  getWorkLogsDs(
    incidentId,
    filter = '',
    sortDirection = 'desc',
    pageIndex = 0,
    pageSize = 20
  ) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/incidents/${incidentId}/logs?page=${pageIndex}&size=${pageSize}&sort=id,${sortDirection}`
      )
      .pipe((tasks) => {
        return tasks;
      });
  }

  getTaskWorkLogsDs(
    taskId,
    filter = '',
    sortDirection = 'desc',
    pageIndex = 0,
    pageSize = 20
  ) {
    return this.http.get<any>(
      `${environment.apiUrl}/tasks/${taskId}/logs?page=${pageIndex}&size=${pageSize}&sort=id,${sortDirection}`
    );
  }

  updateTask(body, id) {
    delete body?.userInfo;
    return this.http
      .put<any>(`${environment.apiUrl}/tasks/${id}`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  updateTaskStatus(id, statusId) {
    return this.http.put<any>(
      `${environment.apiUrl}/tasks/${id}/status/${statusId}`,
      {}
    );
  }

  getTaskTypes() {
    return this.http
      .get<any>(`${environment.apiUrl}/tasks/types`)
      .pipe((types) => {
        return types;
      });
  }

  getTasks(page) {
    return this.http
      .get<any>(`${environment.apiUrl}/tasks?page=${page}&size=10`)
      .pipe((tasks) => {
        return tasks;
      });
  }

  getMyOrgTasks(
    page,
    search,
    sort: { active: string; direction: 'asc' | 'desc' },
    size = 10
  ) {
    let httpParams = new HttpParams();
    httpParams = httpParams
      .append('title', search?.title ?? '')
      .append('body', search.desc ?? '')
      .append('dueDate', search?.dueDate ?? '')
      .append('priority', search?.priority ?? '')
      .append('status', search?.status ?? '')
      .append('incidentId', search?.incidentId ?? '')
      .append('serial', search?.serial ?? '')
      .append('page', page)
      .append('size', `${size ?? 10}`);

    if (sort) {
      // need to ask backend
      httpParams = httpParams.append(
        'sort',
        sort.active + ',' + sort.direction
      );
    }
    return this.http
      .get<HttpResponse<any>>(`${environment.apiUrl}/tasks/by-my-org`, {
        params: httpParams,
      })
      .pipe((tasks) => {
        return tasks;
      });
  }

  getMyAssignedOrgTasks(
    page,
    search,
    sort: { active: string; direction: 'asc' | 'desc' },
    size = 10
  ) {
    let httpParams = new HttpParams();
    httpParams = httpParams
      .append('title', search?.title ?? '')
      .append('body', search.desc ?? '')
      .append('dueDate', search?.dueDate ?? '')
      .append('priority', search?.priority ?? '')
      .append('status', search?.status ?? '')
      .append('incidentId', search?.incidentId ?? '')
      .append('serial', search?.serial ?? '')
      .append('page', page)
      .append('size', `${size ?? 10}`);

    if (sort) {
      // need to ask backend
      httpParams = httpParams.append(
        'sort',
        sort.active + ',' + sort.direction
      );
    }
    return this.http
      .get<HttpResponse<any>>(`${environment.apiUrl}/tasks/for-my-org`, {
        params: httpParams,
      })
      .pipe((tasks) => {
        return tasks;
      });
  }

  //////////////////////////////////////

  getMyAssignedOrgTaskIds(
    page,
    search,
    sort: { active: string; direction: 'asc' | 'desc' },
    size = 10
  ) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/tasks/for-my-org/list-ids?body=${
          search.desc ?? ''
        }&title=${search.title ?? ''}&dueDate=${
          search.dueDate ?? ''
        }&priority=${search.priority ?? ''}&status=${
          search.status ?? ''
        }&page=${page}&size=${size}&sort=${sort?.active ?? ''},${
          sort?.direction ?? ''
        }`
      )
      .pipe((tasks) => {
        return tasks;
      });
  }

  getIncidentTasks(id, paginationConfig) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/tasks/incident/${id}?page=${paginationConfig.currentPage}&size=${paginationConfig.itemsPerPage}`
      )
      .pipe((tasks) => {
        return tasks;
      });
  }

  getIncidentTasksCal(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/tasks/incident/${id}`)
      .pipe((tasks) => {
        return tasks;
      });
  }

  getIncidentTaskStatusStatstics(incidentId: any) {
    return this.http.get<any>(
      `${environment.apiUrl}/incidents/${incidentId}/tasks/status-count`
    );
  }

  getIncidentworkLogs(id) {
    console.trace();
    return this.http
      .get<any>(`${environment.apiUrl}/incidents/${id}/logs`)
      .pipe((tasks) => {
        return tasks;
      });
  }

  getTasksStatus() {
    return this.http
      .get<any>(`${environment.apiUrl}/task-statuses`)
      .pipe((categories) => {
        return categories;
      });
  }

  viewTask(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/tasks/${id}`)
      .pipe((task) => {
        return task;
      });
  }

  getCells() {
    return this.http.get<any>(`${environment.apiUrl}/groups/global`).pipe(
      map((data: any) => {
        return data;
      })
    );
  }

  updateIncidentAssets(body) {
    return this.http
      .put<any>(`${environment.apiUrl}/incident-assets`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  addIncidentAssets(body) {
    return this.http
      .post<any>(`${environment.apiUrl}/incident-assets`, body)
      .pipe((incident) => {
        return incident;
      });
  }

  getHospitals() {
    return this.http
      .get<any>(`${environment.apiUrl}/hospitals`)
      .pipe((report) => {
        return report;
      });
  }

  setHospitals(hopitals) {
    this.Hospitals = hopitals;
    this.onHospitalsChange.next(hopitals);
  }

  filterIncidents(filter: string) {
    return this.http
      .get<any>(`${environment.apiUrl}/incidents/subject?filter=${filter}`)
      .pipe(map((res) => res.result));
  }

  // responsible orgs

  getOrgs(id) {
    return this.http
      .get<any>(`${environment.apiUrl}/organizations/hierarchy/level/${id}`)
      .pipe((orgs) => {
        return orgs;
      });
  }

  updateResponsible(level: any, incId, org) {
    let url;
    if (org == 'primary') {
      url = environment.apiUrl + '/incidents/up/' + incId;
    } else {
      url =
        environment.apiUrl + '/incidents/down/' + incId + '/' + level?.org?.id;
    }

    return new Promise((resolve, reject) => {
      this.http.get(url).subscribe(
        (res) => {
          if (res && res['status']) {
            this.alertService.openSuccessSnackBar();
            this.responsibleOrgsChange.next(level);
            resolve(true);
          } else {
            this.alertService.openFailureSnackBar();
            reject(new Error('failed'));
          }
        },
        (err) => {
          const errMsg =
            this.lang == 'en'
              ? err?.error?.error?.message_En
              : err?.error?.error?.message_Ar;
          this.alertService.openFailureSnackBarWithMsg(errMsg);
          reject(err);
        }
      );
    });
  }

  // DOH data

  getVolunteers() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${environment.apiUrl}/doh/volunteers`)
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject();
          }
          this.dohData = response['result'];
          this.onDohDataChange.next(this.dohData);
          resolve(this.dohData);
        }, reject);
    });
  }

  getBedCapacity() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${environment.apiUrl}/doh/bed-capacity`)
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject();
          }
          this.bedData = response['result'];
          this.onBedDataChange.next(this.bedData);
          resolve(this.bedData);
        }, reject);
    });
  }

  getSharedInfo() {
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(`${environment.apiUrl}/doh/event-info`)
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject();
          }
          this.sharedData = response['result'];
          this.onSharedDataChange.next(this.sharedData);
          resolve(this.sharedData);
        }, reject);
    });
  }

  getKpiByIdWithConfig(id: number) {
    const url = `${environment.apiUrl}/sla/find?communityName=2334&districtName=4545&kpi=3`;
    return new Promise((resolve, reject) => {
      this.http
        .get<any>(
          `${environment.apiUrl}/incident-categorie-config/find/kpi/${id}`
        )
        .subscribe((response: any) => {
          if (!response || response['status']) {
            reject();
          }
          this.kpiInfo = response['result'];
          resolve(this.kpiInfo);
        }, reject);
    });
  }

  getDistricts() {
    return this.http
      .get<any>(`${environment.apiUrl}/service-center-area/district-list`)
      .pipe((districts) => {
        return districts;
      });
  }

  getDistrictsbyCity(cityId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/service-center-area/cities/${cityId}/districts`
      )
      .pipe((districts) => {
        return districts;
      });
  }

  getCommunity(districtName) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/service-center-area/community?district-name=${districtName}`
      )
      .pipe((community) => {
        return community;
      });
  }

  unShortenUrl(url: string) {
    //return this.http.get<any>(`https://unshorten.me/json/${url}`);
    return this.http.get<any>(
      `https://us-central1-unshorten-url.cloudfunctions.net/app?url=${url}`
    );
  }

  getUTMFromUrl(googleMapUrl: string) {
    return this.http.get<any>(
      `${environment.apiUrl}/common/ext/url-to-utm?url=${googleMapUrl}`,
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  getDistrictByUTM(res: {
    easting: number;
    zone: number;
    letter: string;
    northing: number;
  }) {
    const geometry = {
      spatialReference: 'WGS84',
      x: res.easting,
      y: res.northing,
    };
    const url = `/gateway/OnwaniMapServices/1.0/1/query?f=json&geometry=${encodeURI(
      JSON.stringify(geometry)
    )}&outFields=*&spatialRel=esriSpatialRelWithin&geometryType=esriGeometryPoint&inSR=32640&outSR=32640`;
    return this.http.get<any>(url);
  }

  getUTMByIncidentId(incidentId: number) {
    const url =
      environment.ADMGIS_ROOT_ROUTE +
      `/rest/services/ECMS/ECMS/FeatureServer/0/query?f=json&outFields=features&inSR=32640&outSR=32640&spatialRel=esriSpatialRelIntersects&where=INCIDENT_REF_ID%20%3D%20%27${incidentId}%27`;
    return this.http.get<any>(url);
  }

  getUTMByTaskId(taskId: number) {
    const url =
      environment.ADMGIS_ROOT_ROUTE +
      `/rest/services/ECMS/ECMS/FeatureServer/1/query?f=json&outFields=features&inSR=32640&outSR=32640&spatialRel=esriSpatialRelIntersects&where=TASK_REF_ID%20%3D%20%27${taskId}%27`;
    return this.http.get<any>(url);
  }

  getIncidentSurvey(incidentId: number) {
    return this.http.get<any>(
      `${environment.apiUrlV2}/incident-survey/search?incidentId=${incidentId}`
    );
  }

  exportIncidentReport(
    incidentId: number,
    workLogsIds: number[],
    filesUuids: number[]
  ) {
    const uploadHeaders = new HttpHeaders().set(
      'Content-Type',
      'application/pdf'
    );

    return this.http
      .post<Blob>(
        `${environment.apiUrl}/incidents/report/${incidentId}?incidentWorkLogIds=${workLogsIds}&uuids=${filesUuids}`,
        {
          incidentWorkLogIds: workLogsIds,
          uuids: filesUuids,
        },
        {
          headers: uploadHeaders,
          responseType: 'blob' as 'json',
          observe: 'response',
        }
      )
      .pipe((incident) => {
        return incident;
      });
  }
  deleteTask(id) {
    const url = `task/${id}/8`;

    return this.http.put<any[]>(`${environment.apiUrl}/tasks/${id}/status/8`, '').pipe(
      map((items) => {
        if (items) {
          // this.notificationTransaction =  items;
          // this.notificationTransaction$.next(this.notificationTransaction);
          // return this.notificationTransaction;
        }
        return [];
      })
    );
  }
}
