import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {combineLatest, Observable, of, Subject} from "rxjs";
import {IncidentCategoriesAction} from "@core/states/incident-categories/incident-categories.action";
import {IncidentCategoriesState} from "@core/states/incident-categories/incident-categories.state";
import {IncidentCategoryProjaction} from "../../../../api/models/incident-category-projaction";
import {IncidentStatisticsState} from "@core/states/incident-statistics/incident-statistics.state";
import {IncidentStatisticData} from "../../../../api/models/incident-statistic-data";
import {filter, map, startWith, switchMap} from "rxjs/operators";
import {CommonDataState} from "@core/states";

@Component({
  selector: 'app-main-category-widget',
  templateUrl: './main-category-widget.component.html',
  styleUrls: ['./main-category-widget.component.scss']
})
export class MainCategoryWidgetComponent implements OnInit, OnDestroy {
  public incidentCategoriesCount$: Observable<any[]>;

  @Select(IncidentStatisticsState.incidentStatistics)
  public incidentStatistics$: Observable<IncidentStatisticData>;

  public categories$: Observable<any[]>;
  categoriesCount$: Observable<any[]>;

  @Select(IncidentCategoriesState.loading)
  public loading$: Observable<boolean>;

  private destroy$ = new Subject();
  constructor(
      private store: Store,
  ) {
    this.categories$ = this.store
        .select(CommonDataState.incidentCategories)
        .pipe(
            filter((p) => !!p),
            map((l) => l.filter((c) => !c.parent))
        );
  }

  ngOnInit(): void {
    /*this.store
        .dispatch([
          new IncidentCategoriesAction.LoadIncidentCategories(),
        ]);*/
    this.incidentCategoriesCount$ = combineLatest([this.categories$, this.incidentStatistics$.pipe(startWith(null))]).pipe(
        /*map(([categories, incidentStatistics]) => {
          return categories.map((category) => {
            const matchingIncident = incidentStatistics?.incidents.categoryData.find(
                (incident) => incident.id === category.id
            );
            if (matchingIncident) {
              console.log(matchingIncident);
              return { ...category, total: matchingIncident.total };
            }
          });
        })*/
    switchMap(([categories, incidentStatistics]) => {
      if (!incidentStatistics) {
        // Handle the case where incidentStatistics has not emitted a value yet
        return of(categories);
      }

      // Merge data from incidentStatistics into categories based on matching id
      return categories.map((category) => {
        const matchingIncident = incidentStatistics.incidents.categoryData.find(
            (incident) => incident.id === category.id
        );

        if (matchingIncident) {
          console.log(matchingIncident);
          return { ...category, total: matchingIncident.total };
        }
      });
    })
    );







    /*this.incidentStatistics$.subscribe((incidentStatistics) => {
      // Filter and update the categories array
      this.categories = this.categories.map((category) => {
        const matchingIncident = incidentStatistics.incidents.categoryData.find(
            (incident) => incident.id === category.id
        );

        if (matchingIncident) {
          // If a matching incident is found, add the 'total' property
          return { ...category, total: matchingIncident.total };
        }
      });
    });*/
  }
    // this.incidentCategories$ =
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
