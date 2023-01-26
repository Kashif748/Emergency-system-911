import { Injectable } from '@angular/core';
import { map, switchMap, take, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin, Observable, Subject } from 'rxjs';
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
      incidentsLogs: this.getIncidents().pipe(
        switchMap((tasks) => this.getIncidentsLogs(tasks))
      ),
      tasksLogs: this.getTasks().pipe(
        switchMap((incidents) => this.getTasksLogs(incidents))
      ),
    }).subscribe((res) => {
      this.workLogs = res.incidentsLogs;
      this.workogsChange$.next(this.workLogs);
    });
  }
  getIncidents() {
    return this.getAll<any>(`incidents/search`, {
      status: 1,
      page: 0,
      size: 5,
      sort: 'createdOn,desc',
    }).pipe(map((result) => result['content']));
  }
  getTasks() {
    return this.getAll<any>(`tasks/for-my-org`, {
      status: 1,
      page: 0,
      size: 5,
      sort: 'createdOn,desc',
    }).pipe(map((result) => result['content']));
  }

  getIncidentsLogs(incidents: any[]) {
    const ids = incidents.map((incident) => incident?.id);
    const idsQuery = ids.join(',');
    return this.getAll<any>(
      `incidents/dashboard/logs?incidentIds=${idsQuery}`,
      {
        page: 0,
        size: 5,
        sort: 'createdOn,desc',
      }
    ).pipe(
      map((result) => {
        const logs = result['content'] as any[];
        return logs.map((log) => {
          const relatedTo = incidents.find(
            (incident) => incident.id === log['incident']?.id
          );
          log['relatedTo'] = relatedTo;
          log['type'] = 'INCIDENT';
          log['redirect'] = '/incidents/view/' + relatedTo.id;
          log['label'] = relatedTo?.subject;
          log['isNew'] = false;
          log['show'] = false;

          return log;
        });
      })
    );
  }

  getTasksLogs(tasks: any[]) {
    const ids = tasks.map((task) => task?.id);
    const idsQuery = ids.join(',');
    return this.getAll<any>(`tasks/dashboard/logs?taskIds=${idsQuery}`, {
      page: 0,
      size: 5,
      sort: 'createdOn,desc',
    }).pipe(
      map((result) => {
        const logs = result['content'] as any[];
        return logs.map((log) => {
          const relatedTo = tasks.find((task) => task.id === log['taskId']?.id);
          log['relatedTo'] = relatedTo;
          log['type'] = 'TASK';
          log['redirect'] = '/tasks/view/' + relatedTo.id;
          log['isNew'] = false;
          log['label'] = relatedTo?.title;
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
