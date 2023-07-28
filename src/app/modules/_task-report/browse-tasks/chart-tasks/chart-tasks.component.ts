import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { TaskState } from '@core/states';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { debounceTime, filter, map } from 'rxjs/operators';
import { IncidentCategory, Priority, TaskStatus } from 'src/app/api/models';

@Component({
  selector: 'app-chart-tasks',
  templateUrl: './chart-tasks.component.html',
  styleUrls: ['./chart-tasks.component.scss'],
  animations: [
    trigger('slideDown', [
      transition(':enter', [style({ height: 0 }), animate(500)]),
    ]),
  ],
})
export class ChartTasksComponent implements OnInit {
  @Select(TaskState.statisticsLoading)
  loading$: Observable<boolean>;
  @Select(TaskState.statisticsTotal)
  total$: Observable<number>;

  @Select(TaskState.statisticsAvergageCloseTime)
  avergageCloseTime$: Observable<number>;

  @Select(TaskState.statisticsRateCloseWithinTime)
  rateCloseWithinTime$: Observable<number>;

  priority$: Observable<{ series: number[]; labels: string[] }>;
  zone$: Observable<{ series: number[]; labels: string[] }>;

  status$: Observable<ApexAxisChartSeries>;
  category$: Observable<ApexAxisChartSeries>;

  constructor(private store: Store) {
    this.priority$ = store.select(TaskState.statisticsByPriority).pipe(
      filter((d) => !!d),
      map((data: { count: number; priority: Priority }[]) => {
        const vd = data.filter((r) => !!r.priority);
        return {
          series: vd.map((r) => r.count),
          labels: vd.map((r) => r.priority?.nameAr),
        };
      })
    );

    this.zone$ = store.select(TaskState.statisticsZone).pipe(
      filter((d) => !!d),
      map((data: { count: number; key: string }[]) => {
        return {
          series: data.map((r) => r.count),
          labels: data.map((r) => `zone ${r.key}`),
        };
      })
    );

    this.status$ = store.select(TaskState.statisticsByStatus).pipe(
      filter((d) => !!d),
      map((data: { count: number; status: TaskStatus }[]) => {
        return data.map((r) => ({
          name: r.status?.nameAr ?? '',
          data: [r.count ?? 0],
        }));
      })
    );

    this.category$ = store.select(TaskState.statisticsByCategory).pipe(
      filter((d) => !!d),
      map((data: { count: number; category: IncidentCategory }[]) => {
        return data.map((r) => ({
          name: r.category?.nameAr ?? '',
          data: [r.count ?? 0],
        }));
      })
    );
  }

  ngOnInit() {}
}
