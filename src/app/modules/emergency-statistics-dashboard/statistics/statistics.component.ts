import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {combineLatest, Observable, of} from "rxjs";
import {CommonDataState} from "@core/states";
import {BrowseStatisticsAction} from "../states/browse-statistics.action";
import {FormBuilder} from "@angular/forms";
import {BrowseStatisticsState, BrowseStatisticsStateModel} from "../states/browse-statistics.state";
import {IncidentStatisticsState} from "@core/states/incident-statistics/incident-statistics.state";
import {filter, switchMap} from "rxjs/operators";
import {CenterData} from "../../../api/models/center-data";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  lang = 'en';

  public priorities$: Observable<any[]>;

  @Select(IncidentStatisticsState.incidentStatisticsCenter)
  public incidentStatisticsCenter$: Observable<CenterData[]>;

  @Select(BrowseStatisticsState.state)
  public state$: Observable<BrowseStatisticsStateModel>;

  public chartOptionsR: Partial<any>;

  constructor(
      private store: Store,
      private translate: TranslateService,
      private langFacade: ILangFacade,
      private fb: FormBuilder,
  ) {
    this.langFacade.vm$.pipe(
    ).subscribe((res) => {
      if (res['key'] == 'ar') {
        this.lang = ' عدد:';
      } else {
        this.lang = 'Count:';
      }
    });
  }

  ngOnInit(): void {
    this.search();
    this.initCharts();
    this.priorities$ = combineLatest([
      this.store.select(CommonDataState.priorities),
      this.store.select(IncidentStatisticsState.incidentStatistics),
    ]).pipe(
        filter(([priorities, incidentStatistics]) => !!priorities && !!incidentStatistics),
        switchMap(([priorities, incidentStatistics]) => {
          const prioritiesCount = incidentStatistics.incidents.priorityData;

          const categoriesWithTotal = priorities.map(priority => ({
            ...priority,
            total: prioritiesCount.find(data => data.id === priority.id)?.total
          })).filter(priority => !!priority.total);
          return of(categoriesWithTotal);
        }));
    this.updateChart();
  }
  search() {
    this.store.dispatch(new BrowseStatisticsAction.LoadIncidentStatistics());
    this.store.dispatch(new BrowseStatisticsAction.LoadIncidentStatisticsCenter());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    this.store.dispatch(new BrowseStatisticsAction.UpdateFilter(filter));
  }

  clear() {}
  updateChart() {
    this.chartOptionsR = {
      series: [
        {
          name: "Incident Count",
          type: "column",
          data: [440, 505, 414, 671, 227, 413]
        },
        {
          name: "Avg Response Time",
          type: "line",
          data: [23, 42, 35, 27, 43, 22]
        }
      ],
      chart: {
        height: 300,
        type: "line"
      },
      stroke: {
        width: 1,
        colors: ['#d4526e'],
      },
      title: {
        text: ""
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "Mussafah",
        "City Center",
        "Infrastruct Sector",
        "Wathba Center",
        "Zayed City Center",
        "Shahamah Center",
      ],
      xaxis: {
        type: "category"
      },
      yaxis: [
        {
          title: {
            text: ""
          }
        },
        {
          opposite: true,
          title: {
            text: ""
          }
        }
      ]
    };
  }
  initCharts() {
    this.chartOptionsR = {
      series: [
        {
          data: [],
        },
      ],
      chart: {
        type: 'line',
        height: 300,
      },
      colors: [
        '#33b2df',
        '#546E7A',
        '#d4526e',
        '#13d8aa',
        '#A5978B',
        '#2b908f',
      ],
      stroke: {
        width: 1,
        colors: ['#d4526e'],
      },
      dataLabels: {
        enabled: true,
        enabledOnSeries: [1]
      },
      labels: [
        "Mussafah",
        "City Center",
        "Infrastruct Sector",
        "Wathba Center",
        "Zayed City Center",
        "Shahamah Center",
      ],
      xaxis: {
        type: "category"
      },
      yaxis: {
        labels: {
          show: true,
        },
      },
    };
  }
}
