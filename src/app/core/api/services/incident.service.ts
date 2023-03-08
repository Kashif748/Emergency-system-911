import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { UrlHelperService } from '@core/services/url-helper.service';
import * as Search from 'esri/webdoc/applicationProperties/Search';

import { BehaviorSubject, Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import {
  DohModal,
  BedModal,
  EventInfoModal,
} from 'src/app/modules/incidents/doh-dashboard/doh-modal';
import { DashboardModules } from 'src/app/modules/incidents/new-incidents-view/const';
import { SurveyBodyRequest } from 'src/app/modules/survey/incident-survey/const';
import { AlertsService } from 'src/app/_metronic/core/services/alerts.service';

import { environment } from 'src/environments/environment';
import { IncidentFilter } from '../models/filters.model';

import { IncidentReport, IncidentStatistics } from '../models/incident.model';
import { Page, PageRequest } from '../models/page.model';
import { GResult } from '../models/result.model';

export interface HttpResponse<T> {
  error: any;
  result: ResponseResult<T> | T;
  status: boolean;
}

export interface ResponseResult<T> {
  content: T[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: any;
  size: number;
  sorted: any;
  totalElements: number;
  totalPages: number;
}

@Injectable({
  providedIn: 'root',
})
export class IncidentsService {
  private baseUrl = `${environment.apiUrl}/incidents`;
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
  cache$: Map<string, Observable<any>>;
  InterimForm: any;
  sortInterim: any;
  pageInterim: any;

  constructor(
    private http: HttpClient,
    private urlHelper: UrlHelperService,
    private langFacade: ILangFacade,
    private alertService: AlertsService,
    private translationService: TranslationService
  ) {
    this.responsibleOrgsChange = new BehaviorSubject([]);
    this.onDohDataChange = new BehaviorSubject([]);
    this.onBedDataChange = new BehaviorSubject([]);
    this.onSharedDataChange = new BehaviorSubject([]);
    this.onHospitalsChange = new BehaviorSubject([]);
    this.lang = this.translationService.getSelectedLanguage();
    this.cache$ = new Map<string, Observable<any>>();
  }

  create(incident: any) {
    return this.http.post(`${this.baseUrl}`, incident);
  }

  update(incident: any) {
    return this.http.put(`${this.baseUrl}/${incident?.id}`, incident);
  }

  getAll(pageRequest: PageRequest): Observable<GResult<Page>> {
    const params = new HttpParams();
    if (pageRequest) {
      Object.keys(pageRequest).forEach((k) => {
        params.append(k, pageRequest[k] ?? '');
      });
    }
    return this.http.get<GResult<Page>>(`${this.baseUrl}`, {
      params,
    });
  }

  sendOperationalReport(id: any, userId: any) {
    return this.http.get(
      `${environment.apiUrl}/operational-reports/send/${id}?userId=${userId}`
    );
  }

  getTaskCountByStatus(incidentId, statusId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/tasks/status?incidentId=${incidentId}&statusId=${statusId}`
      )
      .pipe(map((r) => r.result));
  }

  // this endpoint needs to add status as filter for better pagination and latest data

  getIncidents(
    page: number,
    sort?: { active: string; direction: 'asc' | 'desc' },
    filter?: IncidentFilter
  ) {
    let httpParams = new HttpParams()
      .append('page', page.toString())
      .append('size', '10')
      .append('statusId', filter?.status ?? '1');
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
      .append('size', `${size ?? 10}`)
      .append('category', search.category ?? '')
      .append('reportingVia', search.reportingVia ?? '')
      .append('responsibleOrg', search.responsibleOrg ?? '')
      .append('organization', search.organization ?? '')
      .append('phoneNumber', search.phoneNumber ?? '');

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

  getById(id) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }

  delete(id) {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getIncidentDashboardStatistics(moduleId?: DashboardModules, filter?: any) {
    if (filter) {
      filter = Object.assign({}, { ...filter, module: moduleId });

      if (moduleId == DashboardModules.INCIDENTS) {
        filter['statuses'] = filter?.status ?? null;
        delete filter['status'];
      }

      moduleId == DashboardModules.INTERIM_INCIDENTS
        ? (filter['status'] = filter?.status ?? null)
        : null;
    }
    let httpParams = this.mapToHttpParams(filter);
    return this.http
      .get<HttpResponse<IncidentStatistics>>(
        `${environment.apiUrl}/incidents/statistics-data`,
        { params: httpParams }
      )
      .pipe(map((data) => data?.result));
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

  getAllWithFilters(
    page,
    search: IncidentFilter,
    sort?: { active: string; direction: 'asc' | 'desc' }
  ) {
    search = Object.assign(
      {},
      {
        ...search,
        phoneNumber: search?.reporterContact ?? '',
        page: page,
        size: 10,
      }
    );
    let httpParams = this.mapToHttpParams(search);
    //httpParams = httpParams

    // .append('fromDate', search?.fromDate ?? '')
    // .append('id', search?.id?.toString() ?? '')
    // .append('priority', search?.priority ?? '')
    // .append('status', search?.status ?? '')
    // .append('subject', search?.subject ?? '')
    // .append('toDate', search?.toDate?.toString() ?? '')
    // .append('page', page)
    // .append('size', '10')
    // .append('city', search?.city?.toString() ?? '')
    // .append('category', search?.category?.toString() ?? '')
    // .append('reportingVia', search?.reportingVia?.toString() ?? '')
    // // .append('riskImpact', search?.riskImpact ?? '')
    // // .append('createdByOrg', search?.createdByOrg ?? '')
    // .append('phoneNumber', search?.reporterContact ?? '')
    // .append('createdByUser', search?.createdByUser?.toString() ?? '')
    // .append('organization', search?.organization?.toString() ?? '')
    // .append('responsibleOrg', search?.responsibleOrg?.toString() ?? '');
    if (sort) {
      // need to ask backend
      httpParams = httpParams.append(
        'sort',
        sort.active + ',' + sort.direction
      );
    }

    return this.http.get<HttpResponse<any>>(
      `${environment.apiUrl}/incidents/search`,
      {
        params: httpParams,
      }
    );
  }

  getReport(search?) {
    const params = new HttpParams()
      .append('fromDate', search?.fromDate ?? '')
      .append('toDate', search?.toDate ?? '')
      .append('centerId', search?.centerId ?? '')
      .append('priority', search?.priority ?? '')
      .append('categoryId', search?.category ?? '')
      .append('reportingVia', search?.reportingVia ?? '')
      .append('createdByUser', search?.createdByUser ?? '')
      .append('responsibleOrg', search?.responsibleOrg ?? '')
      .append('city', search?.city ?? '')
      .append('status', search?.status ?? '')
      .append('organization', search?.organization ?? '')
      .append('subject', search?.subject ?? '')
      .append('id', search?.id ?? '');

    return this.http
      .get<any>(`${this.baseUrl}/incident-report`, {
        params,
      })
      .pipe(map((r) => r.result as IncidentReport));
  }

  downloadReport(
    as: 'PDF' | 'EXCEL',
    page,
    search: IncidentFilter,
    selectedColumns: any[]
  ) {
    const headers = new HttpHeaders().set('Content-Type', 'application/pdf');
    search['as'] = as;
    search['lang'] =
      (this.langFacade.stateSanpshot.ActiveLang.key == 'ar') + '';
    if (selectedColumns && selectedColumns.length > 0) {
      search['columns'] =  selectedColumns.join(',');
    }
    const params = this.mapToHttpParams(search);

    // .set('as', as)
    // .set('lang', (this.langFacade.stateSanpshot.ActiveLang.key == 'ar') + '')
    // .append('fromDate', search?.fromDate ?? '')
    // .append('id', search?.id?.toString() ?? '')
    // .append('priority', search?.priority ?? '')
    // .append('status', search?.status ?? '')
    // .append('subject', search?.subject ?? '')
    // .append('toDate', search?.toDate?.toString() ?? '')
    // .append('city', search?.city?.toString() ?? '')
    // .append('category', search?.category?.toString() ?? '')
    // .append('reportingVia', search?.reportingVia?.toString() ?? '')
    // .append('createdByUser', search.createdByUser?.toString() ?? '')
    // .append('organization', search.organization?.id?.toString() ?? '');

    return this.http
      .get<any>(`${this.baseUrl}/export`, {
        headers,
        params,
        responseType: 'blob' as any,
      })
      .pipe(
        tap((res) => {
          const newBlob = new Blob([res], {
            type: `application/${
              as === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
            }`,
          });
          this.urlHelper.downloadBlob(newBlob);
        })
      );
  }

  getIncidentStatus() {
    return this.http
      .get<any>(`${environment.apiUrl}/incident-statuses`)
      .pipe((categories) => {
        return categories;
      });
  }

  // getInterimIncidents() {
  //   return this.http.get<any>(`${environment.apiUrl}/interim-incidents`);
  // }

  searchInterimIncidents(page, search, size = 10, sort?: any) {
    const params = new HttpParams()
      .append('reportingVia', search?.reportingVia ?? '')
      .append('id', search?.id ?? '')
      .append('fromDate', search?.fromDate ?? '')
      .append('toDate', search?.toDate ?? '')
      .append('reporterMobile', search?.reporterMobile ?? '')
      .append('status', search?.status ?? '')
      .append('subject', search?.subject ?? '')
      .append('size', `${size ?? 10}`)
      .append('page', page)
      .append('sort', sort ?? 'createdOn,desc');
    this.sortInterim = sort ?? 'createdOn,desc';
    return this.http.get<any>(
      `${environment.apiUrl}/interim-incidents/search`,
      { params }
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

  getKpis(categoryId: any, priorityId: any) {
    priorityId = priorityId ?? '';
    categoryId = categoryId ?? '';
    const stgUrl1 = `${environment.apiUrlV2}/kpis/find?incidentCategory=${categoryId}&priorityId=${priorityId}`;

    return this.http.get<any>(stgUrl1).pipe((categories) => {
      return categories;
    });
  }

  getKpiById(kpiId: number) {
    const stgUrl1 = `${environment.apiUrlV2}/kpis/${kpiId}`;

    return this.http.get<any>(stgUrl1).pipe((categories) => {
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

  getPriorities() {
    return this.http
      .get<any>(`${environment.apiUrl}/priorities`)
      .pipe((priorities) => {
        return priorities;
      });
  }

  getAssets() {
    return this.http.get<any>(`${environment.apiUrl}/assets`).pipe((assets) => {
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
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${IncidentId}&entityTagId=1`
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getInterimIncidentFiles(InterimId) {
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
        `${environment.apiUrl}/dms/tag?entityId=${IncidentWLId}&entityTagId=2`
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getTaskFiles(taskId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${taskId}&entityTagId=4`
      )
      .pipe((incident) => {
        return incident;
      });
  }

  getTaskWorkLogFiles(taskWLId) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/dms/tag?entityId=${taskWLId}&entityTagId=6`
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
    sort: { active: string; direction: 'asc' | 'desc' }
  ) {
    return this.http
      .get<any>(
        `${environment.apiUrl}/tasks/by-my-org?body=${search.desc}&title=${
          search.title
        }&dueDate=${search.dueDate}&priority=${search.priority}&status=${
          search.status
        }&page=${page}&size=10&sort=${sort?.active ?? ''},${
          sort?.direction ?? ''
        }`
      )
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
    return this.http
      .get<any>(
        `${environment.apiUrl}/tasks/for-my-org?body=${
          search.desc ?? ''
        }&title=${search.title ?? ''}&dueDate=${
          search.dueDate ?? ''
        }&priority=${search.priority ?? ''}&status=${
          search.status
        }&page=${page}&size=${size}&sort=${sort?.active ?? ''},${
          sort?.direction ?? ''
        }`
      )
      .pipe((tasks) => {
        return tasks;
      });
  }

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
      .pipe((incident) => {
        return incident;
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

  getIncidentSurvey(incidentId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}/incident-survey?incidentId=${incidentId}`
    );
  }

  getCenters() {
    if (this.cache$.has(`/service-center-area/centers`)) {
      return this.cache$.get(`/service-center-area/centers`);
    } else {
      let observable = this.http
        .get(`${environment.apiUrl}/service-center-area/centers`)
        .pipe(shareReplay());
      this.cache$.set(`/service-center-area/centers`, observable);
      return observable;
    }
  }

  getCentersForCurrentOrg() {
    if (this.cache$.has(`/service-center-area/center-list`)) {
      return this.cache$.get(`/service-center-area/center-list`);
    } else {
      let observable = this.http
        .get(`${environment.apiUrl}/service-center-area/center-list`)
        .pipe(shareReplay());
      this.cache$.set(`/service-center-area/center-list`, observable);
      return observable;
    }
  }

  addUpdateInquiry(body: any, method: 'POST' | 'PUT') {
    if (method === 'POST') {
      return this.http.post<any>(`${environment.apiUrl}/inquiry`, body);
    } else {
      // update
      return this.http.put<any>(`${environment.apiUrl}/inquiry`, body);
    }
  }

  getIncidentInquiry(incidentId: string) {
    return this.http.get(`${environment.apiUrl}/inquiry/` + incidentId);
  }

  getIncidentSurveyConfig() {
    return this.http
      .get(`${environment.apiUrlV2}/incident-survey-config/ext`)
      .pipe(map((response: any) => response?.result));
  }

  postIncidentSurveyResults(incidentId: string, body: SurveyBodyRequest) {
    return this.http.post(
      `${environment.apiUrlV2}/incident-survey/ext/${incidentId}`,
      body
    );
  }

  verifyIncidentLocation(uuid: string) {
    return this.http.get(`${environment.apiUrlV2}/incidents/uuid?uuid=${uuid}`);
  }
}
