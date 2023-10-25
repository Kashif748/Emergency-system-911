import { Injectable } from '@angular/core';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { Inew } from 'src/app/modules/news/models/new.interface';
import { New } from 'src/app/modules/news/models/new.model';
import { DataSourceService } from 'src/app/modules/services/data-source/data-source.service';
import {DashboardBCStatistics, DashboardStatistics} from './random-data';
import { NotificationsEvents } from '@core/constant/NotificationsEvents';
import {TranslateObjPipe} from "@shared/sh-pipes/translate-obj.pipe";
import {TranslationService} from "../../modules/i18n/translation.service";
import {PrivilegesService} from "@core/services/privileges.service";

const baseUrl = '';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends DataSourceService {
  newsChanged$: Subject<New[]> = new Subject();
  statistics: DashboardStatistics;
  bcStatistics: DashboardBCStatistics;
  bcStatisticsChange$: BehaviorSubject<DashboardBCStatistics | null> =
    new BehaviorSubject(null);
  statisticsChange$: BehaviorSubject<DashboardStatistics | null> =
    new BehaviorSubject(null);

  workLogs: any[];
  workogsChange$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor(private translationService: TranslationService, private privilegesService: PrivilegesService,) {
    super(baseUrl);
  }

  getIds() {
    return forkJoin({
      incidentsLogs: this.getAll<any>(`incidents/search/list-ids`, {
        status: 1,
      }).pipe(
        switchMap((ids) => this.getIncidentsLogs(ids)),
        catchError((err) => of([]))
      ),
      tasksForLogs: this.getAll<any>(`tasks/for-my-org/list-ids`, {}).pipe(
        switchMap((ids) => this.getTasksLogs(ids)),
        catchError((err) => of([]))
      ),
      tasksByLogs: this.getAll<any>(`tasks/by-my-org/list-ids`, {}).pipe(
        switchMap((ids) => this.getTasksLogs(ids)),
        catchError((err) => of([]))
      ),
    }).subscribe((res) => {
      const logs = [
        ...res.incidentsLogs,
        ...res.tasksByLogs,
        ...res.tasksForLogs,
      ];
      this.workLogs = this.sortLogsByDate(logs);
      this.workogsChange$.next(this.workLogs);
    });
  }

  getIncidentsLogs(ids: any[]) {
    return this.http
      .post<any>(
        this.getFullUrl(`incidents/dashboard/logs`),
        {
          isAutoWorkLog: null,
          incidentIds: ids,
        },
        {
          params: {
            page: '0',
            size: '10',
            sort: 'createdOn,desc',
          },
        }
      )
      .pipe(
        map((response) => {
          const logs = response?.result['content'] as any[];
          return logs.map((log) => {
            log['relatedTo'] = log?.incident;
            log['type'] = 'INCIDENT';
            log['redirect'] = '/incidents/view/' + log?.incident.id;
            log['label'] = log?.incident?.subject;
            log['isNew'] = false;
            log['show'] = false;

            return log;
          });
        })
      );
  }

  getTasksLogs(ids: any[]) {
    return this.http
      .post<any>(
        this.getFullUrl(`tasks/dashboard/logs`),
        {
          isAutoWorkLog: null,
          tasksIds: ids,
        },
        {
          params: {
            page: '0',
            size: '10',
            sort: 'createdOn,desc',
          },
        }
      )
      .pipe(
        map((response) => {
          const logs = response?.result['content'] as any[];
          return logs.map((log) => {
            log['relatedTo'] = log?.taskId;
            log['type'] = 'TASK';
            log['redirect'] = '/incidents/viewTask/' + log?.taskId?.id;
            log['isNew'] = false;
            log['label'] = log?.taskId?.title;
            log['show'] = false;
            return log;
          });
        })
      );
  }

  sortLogsByDate(logs: any[]) {
    return logs.sort(function (a, b) {
      const c = new Date(a.createdOn).getTime();
      const d = new Date(b.createdOn).getTime();
      return c < d ? 1 : -1;
    });
  }

  checkLogsChanges(payload) {
    const data = [payload.data];
    const eventType = payload.data?.event;
    let obs: Observable<any[]>;
    switch (eventType) {
      case NotificationsEvents.C_TASK_WL:
      case NotificationsEvents.C_INC_WL:
        this.getIds();
        break;
      case NotificationsEvents.CLOSE_INC:
      case NotificationsEvents.D_INC:
      case NotificationsEvents.C_INC:
      case NotificationsEvents.C_TASK:
        this.getStatistic();
        break;
      default:
        break;
    }
  }
  getContent() {
    return this.getAll<Inew[]>('news', {
      page: 0,
      size: 25,
      sort: 'createdDate,desc',
      activeNews: true,
    }).pipe(
      map((result) => result['content'] as Inew[]),
      map((data) => data.map((item) => new New(item))),
      tap((data) => {
        this.newsChanged$.next(data);
      })
    );
  }


  getBcStatistic(cycle, hie?) {
    const lang = this.translationService.getSelectedLanguage();
    return forkJoin({
      bcStatistics: this.getAll<any>(
        'bc/dashboard/statistics?', {
          cycleId: cycle,
          orgHierarchyId: hie || ''
        }
      ),
    }).pipe(
      tap(
        ({
           bcStatistics,
         }) => {
          this.bcStatistics = {
            ...bcStatistics,
            currentAnalysisCycle: (bcStatistics.nameAr != 'Null' && bcStatistics.nameAr != '' && bcStatistics.nameEn != 'Null' && bcStatistics.nameEn != '') ?
              lang == 'en' ? bcStatistics.nameEn : bcStatistics.nameAr : '-',
            criticalActivities: bcStatistics.criticalActivities ? (bcStatistics.criticalActivities * 100) + ' % - ' + bcStatistics.criticalActivities : 0
          };
          this.bcStatisticsChange$.next(this.bcStatistics);
        }
      )
    )
      .subscribe();
  }

  getStatistic() {
    const checkUpdateLocation = this.privilegesService.checkActionPrivilege('PRIV_VW_ORG_ACTIVITY');

    forkJoin({
      incidentsStatistics: this.getAll<any>('dashboard/incidents/statistics').pipe(
        catchError(error => {
          console.error('Error fetching incidents statistics', error);
          return of(null);
        })
      ),
      tasksStatistics: this.getAll<any>('dashboard/tasks/statistics').pipe(
        catchError(error => {
          console.error('Error fetching tasks statistics', error);
          return of(null);
        })
      ),
      correspondenceStatistics: this.getAll<any>('dashboard/correspondence/statistics').pipe(
        catchError(error => {
          console.error('Error fetching correspondence statistics', error);
          return of(null);
        })
      ),
      bcSectionDetail: checkUpdateLocation ? this.getAll<any>('bc/dashboard/section-details').pipe(
        catchError(error => {
          console.error('Error fetching bcSectionDetail', error);
          return of(null);
        })
      ) : of(null),
    })
      .pipe(
        tap(({ incidentsStatistics, tasksStatistics, correspondenceStatistics, bcSectionDetail }) => {
          this.statistics = {
            ...(incidentsStatistics || {}),
            ...(tasksStatistics || {}),
            ...(correspondenceStatistics || {}),
            nationalCompliance: bcSectionDetail ? bcSectionDetail.nationalCompliance + ' %' : null,
            bcSectiondetails: bcSectionDetail ? bcSectionDetail.bcSectionDetails : null,
          };
          this.statisticsChange$.next(this.statistics);
        })
      )
      .subscribe();
  }
  getInProgressIncidnts() {
    return this.getAll<any>(
      'dashboard/in-progress/incident-priority/statistics'
    );
  }

  addToNews(news: New) {
    this.newsChanged$.next([news]);
  }
}
