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

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  lang = 'en';

  public priorities$: Observable<any[]>;

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
  initCharts() {
    this.chartOptionsR = {
      series: [
        {
          data: [],
        },
      ],
      chart: {
        type: 'bar',
        height: 300,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '55%',
          endingShape: 'rounded',
          dataLabels: {
            enabled: false,
            show: false,
          },
        },
      },
      colors: [
        '#33b2df',
        '#546E7A',
        '#d4526e',
        '#13d8aa',
        '#A5978B',
        '#2b908f',
      ],
      dataLabels: {
        enabled: false,
        textAnchor: 'start',
        style: {
          colors: ['black'],
          fontFamily: 'Tajawal',
        },
        formatter(val, opt) {
          return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val;
        },
        offsetX: 0,
      },
      stroke: {
        width: 1,
        colors: ['#000'],
      },
      xaxis: {
        categories: [],
      },
      yaxis: {
        labels: {
          show: true,
        },
      },

      tooltip: {
        theme: 'dark',
        enabled: true,
        y: {
          show: true,
          formatter: (value, { series, seriesIndex, dataPointIndex, w }) => {
            return value;
          },
          title: {
            formatter: (seriesName) => (this.lang),
          },
        },
        z: {
          formatter: undefined,
        },
      },
    };
  }
}
