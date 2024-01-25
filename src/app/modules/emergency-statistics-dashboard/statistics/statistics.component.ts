import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {Observable} from "rxjs";
import {CommonDataState} from "@core/states";
import {PriorityProjection} from "../../../api/models/priority-projection";
import {BrowseStatisticsAction} from "../states/browse-statistics.action";
import {FormBuilder} from "@angular/forms";
import {BrowseStatisticsState, BrowseStatisticsStateModel} from "../states/browse-statistics.state";
import {IncidentStatisticsState} from "@core/states/incident-statistics/incident-statistics.state";
import {IncidentStatisticData} from "../../../api/models/incident-statistic-data";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  lang = 'en';
  @Select(CommonDataState.priorities)
  public priorities$: Observable<PriorityProjection[]>;

  @Select(IncidentStatisticsState.incidentStatistics)
  public incidentStatistics$: Observable<IncidentStatisticData>;

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
    this.search()
    this.initCharts();
  }
  search() {
    this.store.dispatch(new BrowseStatisticsAction.LoadIncidentStatistics());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    /*if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
        case 'orgIds':
          filter['orgIds'] = filter['orgIds']
              .map((o) => {
                return {
                  key: o?.key,
                  labelEn: o.labelEn,
                  labelAr: o.labelAr,
                };
              })
              .filter((id) => ![undefined, null].includes(id));
          break;

        default:
          break;
      }
    }*/

/*    this.store
        .dispatch(new BrowseTasksAction.UpdateFilter(filter))
        .toPromise()
        .then(() => {
          if (filter.type) {
            this.search();
          }
        });*/
  }

  clear() {
  /*  this.store.dispatch([
      new BrowseVenderAction.UpdateFilter({ clear: true }),
      new BrowseVenderAction.LoadVender(),
    ]);*/
  }
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
