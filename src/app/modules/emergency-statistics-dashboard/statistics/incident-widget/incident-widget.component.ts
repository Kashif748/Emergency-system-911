import {Component, OnDestroy, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {Observable, Subject} from "rxjs";
import {IncidentStatisticsState} from "@core/states/incident-statistics/incident-statistics.state";
import {IncidentStatisticData} from "../../../../api/models/incident-statistic-data";
import {CenterData} from "../../../../api/models/center-data";
import {filter, take, tap} from "rxjs/operators";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-incident-widget',
  templateUrl: './incident-widget.component.html',
  styleUrls: ['./incident-widget.component.scss']
})
export class IncidentWidgetComponent implements OnInit, OnDestroy {
  @Select(IncidentStatisticsState.incidentStatisticsCenter)
  public incidentStatisticsCenter$: Observable<CenterData[]>;

  @Select(IncidentStatisticsState.incidentStatistics)
  public incidentStatistics$: Observable<IncidentStatisticData>;

  avgResponseTime: any;
  closeIncidentTimePercentage: any;
  destroy$ = new Subject();
  constructor(
      private store: Store,
      private translate: TranslateService,
      private lang: ILangFacade) { }

  ngOnInit(): void {
    this.incidentStatisticsCenter$.pipe(
        filter((t) => !!t),
        take(1),
        tap((v) => {
          this.avgResponseTime = (v?.reduce((sum, center) => sum + center.totalNumberOfAverageHoursSpent, 0)).toFixed(2);
          this.closeIncidentTimePercentage = (v?.reduce((sum, center) => sum + center.totalNumberOfIncidentsClosedInTime, 0)).toFixed(2);
        })
    ).subscribe();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
