import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {combineLatest, Observable, of, Subject} from "rxjs";
import {IncidentStatisticsState} from "@core/states/incident-statistics/incident-statistics.state";
import {filter, switchMap} from "rxjs/operators";
import {CommonDataState} from "@core/states";

@Component({
  selector: 'app-main-category-widget',
  templateUrl: './main-category-widget.component.html',
  styleUrls: ['./main-category-widget.component.scss']
})
export class MainCategoryWidgetComponent implements OnInit, OnDestroy {
  public categories$: Observable<any[]>;

  private destroy$ = new Subject();
  constructor(
      private store: Store,
  ) {}

  ngOnInit(): void {
    this.categories$ = combineLatest([
      this.store.select(CommonDataState.incidentCategories),
      this.store.select(IncidentStatisticsState.incidentStatistics),
    ]).pipe(
        filter(([categories, statistics]) => !!categories && !!statistics),
        switchMap(([categories, statistics]) => {
          const categoryData = statistics.incidents.categoryData;

          const categoriesWithTotal = categories.map(category => ({
            ...category,
            total: categoryData.find(data => data.id === category.id)?.total
          })).filter(category => !!category.total);
          return of(categoriesWithTotal);
        }));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
