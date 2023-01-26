import { Component, Input, OnInit, ViewChild } from "@angular/core";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexTooltip,
  ApexFill,
  ApexLegend,
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  yaxis: ApexYAxis;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
  tooltip: ApexTooltip;
  fill: ApexFill;
  legend: ApexLegend;
};

@Component({
  selector: "app-area-chart",
  templateUrl: "./area-chart.component.html",
  styleUrls: ["./area-chart.component.scss"],
})
export class AreaChartComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  @Input("sector") sector: any[];
  public chartOptions: Partial<ChartOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "تم التحضير",
          data: [44, 55, 41, 37],
        },
        {
          name: "لم يتم التحضير",
          data: [53, 32, 33, 52],
        },
        {
          name: "معطل",
          data: [12, 17, 11, 9],
        },
        {
          name: "غير فعال",
          data: [9, 7, 5, 8],
        },
      ],
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
        fontFamily: "Tajawal",
      },
      plotOptions: {
        bar: {
          horizontal: true,
        },
      },
      stroke: {
        width: 1,
        colors: ["#fff"],
      },
      title: {
        text: "معدل الجاهزية  والإستعداد",
      },
      xaxis: {
        categories: [
          "مراكز  الدفاع  المدني",
          "دوريات الاسعاف",
          "دوريات  الانقاذ",
          "دوريات بلرق والنقاط",
        ],
      },
      yaxis: {
        labels: {
          align: "left",
        },
      },
      tooltip: {
        y: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      fill: {
        opacity: 1,
      },
      legend: {
        position: "top",
        horizontalAlign: "left",
        offsetX: 40,
      },
    };
  }
  ngOnInit(): void {
    this.calcChartData();
  }

  calcChartData() {
    const shiftsKeys = ["shift1", "shift2", "shift3"];
    let shiftsValues = [
      {
        title: "prepared",
        value: 0,
      },
      {
        title: "not_prepared",
        value: 0,
      },
      {
        title: "inactive",
        value: 0,
      },
      {
        title: "Damage",
        value: 0,
      },
    ];

    let result = {
      shift1: 0,
      shift2: 0,
      shift3: 0,
    };
    // this.sector.forEach((element) => {
    //   for (let i = 0; i < shiftsKeys.length; i++) {
    //     const key = shiftsKeys[i];
    //     let shiftValue = element[key];
    //     result[key] += element[key];
    //   }
    // });
  }
}
