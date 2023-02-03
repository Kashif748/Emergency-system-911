import { Injectable } from '@angular/core';
import { catchError, map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, of, Subject } from 'rxjs';
import { Inew } from 'src/app/modules/news/models/new.interface';
import { New } from 'src/app/modules/news/models/new.model';
import { DataSourceService } from 'src/app/modules/services/data-source/data-source.service';
import { DashboardStatistics } from './random-data';
import { NotificationsEvents } from '@core/constant/NotificationsEvents';

const baseUrl = '';

@Injectable({
  providedIn: 'root',
})
export class DashboardService extends DataSourceService {
  newsChanged$: Subject<New[]> = new Subject();
  statistics: DashboardStatistics;
  statisticsChange$: BehaviorSubject<DashboardStatistics | null> =
    new BehaviorSubject(null);

  workLogs: any[];
  workogsChange$: BehaviorSubject<any[]> = new BehaviorSubject([]);

  constructor() {
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
      this.workLogs = [
        ...res.incidentsLogs,
        ...res.tasksByLogs,
        ...res.tasksForLogs,
      ];
      this.workogsChange$.next(this.workLogs);
    });
  }

  getIncidentsLogs(ids: any[]) {
    return this.http
      .post<any>(
        this.getFullUrl(`incidents/dashboard/logs`),
        {
          isAutoWorkLog: true,
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
          isAutoWorkLog: true,
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
            log['relatedTo'] = log?.task;
            log['type'] = 'TASK';
            log['redirect'] = '/tasks/view/' + log?.task?.id;
            log['isNew'] = false;
            log['label'] = log?.task?.title;
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

  getStatistic() {
    return forkJoin({
      incidentsStatistics: this.getAll<any>('dashboard/incidents/statistics'),
      tasksStatistics: this.getAll<any>('dashboard/tasks/statistics'),
      correspondenceStatistics: this.getAll<any>(
        'dashboard/correspondence/statistics'
      ),
    })
      .pipe(
        tap(
          ({
            incidentsStatistics,
            tasksStatistics,
            correspondenceStatistics,
          }) => {
            this.statistics = {
              ...incidentsStatistics,
              ...tasksStatistics,
              ...correspondenceStatistics,
            };
            this.statisticsChange$.next(this.statistics);
          }
        )
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
