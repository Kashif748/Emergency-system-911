import { Component, OnInit } from '@angular/core';
import { TaskState } from '@core/states';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { Priority, TaskStatus } from 'src/app/api/models';

@Component({
  selector: 'app-chart-tasks',
  templateUrl: './chart-tasks.component.html',
  styleUrls: ['./chart-tasks.component.scss'],
})
export class ChartTasksComponent implements OnInit {
  @Select(TaskState.statisticsTotal)
  total$: Observable<number>;
  priority$: Observable<{ series: number[]; labels: string[] }>;
  status$: Observable<ApexAxisChartSeries>;

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

    this.status$ = store.select(TaskState.statisticsByStatus).pipe(
      filter((d) => !!d),
      map((data: { count: number; status: TaskStatus }[]) => {
        return data.map((r) => ({
          name: r.status?.nameAr ?? '',
          data: [r.count ?? 0],
        }));
      })
    );
  }

  ngOnInit() {}
}
