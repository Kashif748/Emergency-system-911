import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {
  ApexAxisChartSeries,
  ApexChart,
  ApexDataLabels,
  ApexFill,
  ApexLegend,
  ApexPlotOptions,
  ApexStroke,
  ApexTooltip,
  ApexXAxis,
  ApexYAxis,
  ChartComponent
} from 'ng-apexcharts';
import {pipe} from 'rxjs';
import {filter, tap} from 'rxjs/operators';
import {TranslationService} from 'src/app/modules/i18n/translation.service';
import {IncidentsService} from 'src/app/_metronic/core/services/incidents.service';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  stroke: ApexStroke;
  legend: ApexLegend;
};

interface Statistics {
  deaths: number[];
  majorInjuries: number[];
  normalInjuries: number[];
  minorInjuries: number[];
}

@Component({
  selector: 'app-hospitals-statistics',
  templateUrl: './hospitals-statistics.component.html',
  styleUrls: ['./hospitals-statistics.component.scss'],
})
export class HospitalsStatisticsComponent implements OnInit {
  // UI
  @ViewChild('chart') chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  // Variables
  hospitals: any[] = [];
  isPreparedChartData = false;

  constructor(
    private translationService: TranslationService,
    private cd: ChangeDetectorRef,
    private incidentService: IncidentsService
  ) {
  }


  ngOnInit(): void {
    this.incidentService.onHospitalsChange.pipe(
      filter((data) => {
        console.log('statistics', data);
        return data != null;
      }),
      tap((data: any[]) => {
        this.hospitals = data;
        const statistics = this.prepareHospitalsData();
        this.prepareChart(statistics);
        setTimeout(() => {
          this.isPreparedChartData = true;
          this.cd.detectChanges();
        }, 100);
      })
    ).subscribe();
  }

  prepareHospitalsData(): Statistics {
    const statistics: Statistics = {
      deaths: new Array(12).fill(0),
      majorInjuries: new Array(12).fill(0),
      minorInjuries: new Array(12).fill(0),
      normalInjuries: new Array(12).fill(0),
    };

    this.hospitals.forEach((hospital) => {
      let month = new Date(hospital.logDate).getMonth();

      if (!month) {
        month = new Date().getMonth();
      }

      statistics.deaths[month] += hospital.deaths;
      statistics.majorInjuries[month] += hospital.majorInjuries;
      statistics.minorInjuries[month] += hospital.minorInjuries;
      statistics.normalInjuries[month] += hospital.normalInjuries;
    });

    return statistics;
  }

  prepareChart(statistics: Statistics) {
    this.chartOptions = {
      series: [
        {
          name: this.translationService.get('INCIDENTS.NO_OF_DEATHS'),
          data: statistics.deaths,
        },
        {
          name: this.translationService.get('INCIDENTS.SERIOUS_INJURIES'),
          data: statistics.majorInjuries,
        },
        {
          name: this.translationService.get('INCIDENTS.MINOR_INJURIES'),
          data: statistics.minorInjuries,
        },
        {
          name: this.translationService.get('INCIDENTS.NORMAL_INJURIES'),
          data: statistics.normalInjuries,
        },
      ],
      chart: {
        type: 'bar',
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: '60%',
          endingShape: 'rounded',
        },
      },

      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ['transparent'],
      },
      xaxis: {
        categories: [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sep',
          'Oct',
          'Nov',
          'Dec',
        ],
        labels: {
          style: {
            cssClass: 'labels-bar',
          },
        },
      },
      yaxis: {
        title: {
          text: this.translationService.get('INCIDENTS.NUMBER'),
        },
        labels: {
          style: {
            cssClass: 'labels-bar',
          },
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        y: {
          formatter(val) {
            return val.toString() + ' P';
          },
        },
      },
    };
  }

  updateChart(hospitals: any[]) {
    this.hospitals = [...hospitals];
    const statistics = this.prepareHospitalsData();

    this.chart.updateSeries([
      {
        data: statistics.deaths,
      },
      {
        data: statistics.majorInjuries,
      },
      {
        data: statistics.minorInjuries,
      },
      {
        data: statistics.normalInjuries,
      },
    ]);
  }
}
