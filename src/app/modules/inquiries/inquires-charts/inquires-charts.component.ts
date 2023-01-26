import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { catchError, skip, tap } from 'rxjs/operators';
import { TranslationService } from '../../i18n/translation.service';
import { InquiriesService } from '../inquiries.service';

@Component({
  selector: 'app-inquires-charts',
  templateUrl: './inquires-charts.component.html',
  styleUrls: ['./inquires-charts.component.scss'],
})
export class InquiresChartsComponent implements OnInit {
  lang = 'en';
  public chartOptions_R: Partial<any>;

  numberOfInquires;
  loading = true;

  constructor(
    private inquiryServices: InquiriesService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.inquiryServices.getStatistics();
    this.initCharts();
    this.inquiryServices.onChartsData
      .pipe(
        skip(1),
        tap((data) => {
          this.numberOfInquires = data;
          this.updateChart();
          setTimeout(() => {
            this.loading = false;
          }, 200);
          this.cdr.detectChanges();
        }),
        catchError((e: any) => {
          this.loading = false;
          return e;
        })
      )
      .subscribe();
  }

  updateChart() {
    this.chartOptions_R = {
      series: [
        {
          data: this.numberOfInquires.map((item) => {
            return item['count'];
          }),
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
        colors: ['#fff'],
      },
      xaxis: {
        categories: this.numberOfInquires.map((item) => {
          return item.date;
        }),
      },
      yaxis: {
        labels: {
          show: false,
        },
        max:
          Math.max.apply(
            Math,
            this.numberOfInquires.map((o) => {
              return o.count;
            })
          ) + 1,
      },

      tooltip: {
        theme: 'dark',
        enabled: true,
        y: {
          show: true,
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            return value;
          },
          title: {
            formatter: (seriesName) => (this.lang == 'en' ? 'Count:' : 'عدد:'),
          },
        },
        z: {
          formatter: undefined,
        },
      },
    };
  }
  initCharts() {
    this.chartOptions_R = {
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
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            return value;
          },
          title: {
            formatter: (seriesName) => (this.lang == 'en' ? 'Count:' : ' عدد:'),
          },
        },
        z: {
          formatter: undefined,
        },
      },
    };
  }
}
