import { Component, OnInit, ViewChild } from "@angular/core";
import { FormGroup, FormControl } from "@angular/forms";
import { ChartDataSets, ChartOptions, ChartType } from "chart.js";
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexXAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexTitleSubtitle,
  ApexYAxis,
  ApexTooltip,
  ApexFill,
  ApexLegend,
} from "ng-apexcharts";
import * as pluginDataLabels from "chartjs-plugin-datalabels";

import { Color, Label } from "ng2-charts";

@Component({
  selector: "app-trending-dashboard",
  templateUrl: "./trending-dashboard.component.html",
  styleUrls: ["./trending-dashboard.component.scss"],
})
export class TrendingDashboardComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;

  public dateRange = new FormGroup({
    start: new FormControl(),
    end: new FormControl(),
  });

  public platfrom = new FormControl('twitter');

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Like",
          data: [44, 55, 41, 37, 22, 43, 21],
        },
        {
          name: "Love",
          data: [53, 32, 33, 52, 13, 43, 32],
        },
        {
          name: "Care",
          data: [12, 17, 11, 9, 15, 11, 20],
        },
        {
          name: "Haha",
          data: [9, 7, 5, 8, 6, 9, 4],
        },
        {
          name: "Wow",
          data: [25, 12, 19, 32, 25, 24, 10],
        },
        {
          name: "Sad",
          data: [25, 132, 49, 12, 45, 14, 15],
        },
        {
          name: "Angry",
          data: [125, 32, 19, 42, 25, 24, 10],
        },
      ],

      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        stackType: "100%",
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
        // text: "!!"
      },
      xaxis: {
        categories: [
          "Malaysia",
          "Germany",
          "Afghanistan",
          "Paraguay",
          "Ghana",
          "China",
          "Iraq",
        ],
        labels: {
          formatter: function (val) {
            return val + "K";
          },
        },
      },
      yaxis: {
        title: {
          text: undefined,
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
    } as any;
  }

  ngOnInit() {}

  // google
  public barChartOptions: ChartOptions | any = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: "end",
        align: "end",
      },
    },
  };

  public barChartLabels: Label[] = [
    "2006",
    "2007",
    "2008",
    "2009",
    "2010",
    "2011",
    "2012",
  ];
  public barChartType: ChartType = "bar";
  public barChartLegend = true;
  public barChartPlugins = [pluginDataLabels];

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: "Series A" },
    { data: [28, 48, 40, 19, 86, 27, 90], label: "Series B" },
  ];

  // twitter

  public pieChartOptions: Partial<ChartOptions> | any = {
    series: [44, 55, 13, 43, 22],
    chart: {
      type: "pie",
    },
    labels: ["Team A", "Team B", "Team C", "Team D", "Team E"],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    legend: { position: "bottom" },
  };

  // locations
  lineChartOptions = {
    series: [
      {
        name: "Desktops",
        data: [10, 41, 35, 51, 49, 62, 69, 91, 148],
      },
    ],
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
    },
    title: {
      // text: "Product Trends by Month",
      align: "left",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
      ],
    },
  };
}
