import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {TranslationService} from '../../../i18n/translation.service';
import {ReportItem} from '../public-position.component';

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  labels: string[];
  plotOptions: ApexPlotOptions;
  legend: ApexLegend;
};

@Component({
  selector: 'app-centers-chart',
  templateUrl: './centers-chart.component.html',
  styleUrls: ['./centers-chart.component.scss'],
})
export class CentersChartComponent implements OnChanges {
  public chartOptions: Partial<ChartOptions>;
  @Input() centers: ReportItem[];
  lang = 'en';

  constructor(private readonly translationService: TranslationService) {
    this.lang = this.translationService.getSelectedLanguage();
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.chartOptions = null;
    const percentages = [];
    let total = 0;
    this.centers.forEach(value => {
      percentages.push(value.percentage);
      total += value.count;
    });
    const labels = this.centers.map(value => {
      if (!value.nameAr && !value.nameEn) {
        return value.key;
      }
      if (this.lang === 'ar') {
        return value.nameAr ? value.nameAr : '';
      }
      return value.nameEn ? value.nameEn : '';
    });
    this.chartOptions = {
      series: percentages,
      chart: {
        type: 'radialBar',
        height: 500,
        width: 300
      },
      plotOptions: {
        radialBar: {
          dataLabels: {
            name: {
              fontSize: '22px'
            },
            value: {
              fontSize: '16px'
            },
            total: {
              show: true,
              label: this.lang === 'ar' ? 'الإجمالى' : 'Total',
              formatter: (w) => {
                return total.toString();
              }
            }
          }
        }
      },
      labels,
      legend: {
        show: true,
        position: 'bottom',
        floating: false,
        formatter: (seriesName, opts) => {
          return seriesName + ': ' + opts.w.globals.series[opts.seriesIndex] + ' %';
        },
      }
    };
  }

}
