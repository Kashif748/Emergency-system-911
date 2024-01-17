import {Component, OnInit} from '@angular/core';
import {Select, Store} from "@ngxs/store";
import {TranslateService} from "@ngx-translate/core";
import {ILangFacade} from "@core/facades/lang.facade";
import {Observable} from "rxjs";
import {CommonDataState} from "@core/states";
import {PriorityProjection} from "../../../api/models/priority-projection";

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  lang = 'en';
  @Select(CommonDataState.priorities)
  public priorities$: Observable<PriorityProjection[]>;

  public chartOptionsR: Partial<any>;

  constructor(
      private store: Store,
      private translate: TranslateService,
      private langFacade: ILangFacade,
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
    this.initCharts();
  }
  search() {
    //this.store.dispatch(new BrowseVenderAction.LoadVender());
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
