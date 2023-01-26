import { Component, Input, OnInit } from "@angular/core";

import { data } from "../incident-report-data";

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
})
export class StatisticsComponent implements OnInit {
  incidentsChartData = data.incidentsChart;
  progressBarData = this.incidentsChartData.progressBarData;
  @Input()
  public statistics: {
    deaths: number;
    majorInjuries: number;
    normalInjuries: number;
    minorInjuries: number;
    staffInjuries: number;
  };
  public stats;
  constructor() {}

  ngOnInit(): void {
    let total =
      this.statistics?.deaths +
      this.statistics?.majorInjuries +
      this.statistics?.minorInjuries +
      this.statistics?.normalInjuries +
      this.statistics?.staffInjuries;
    this.stats = [
      {
        key: { Ar: "عدد الوفيات", En: "Deaths" },
        value: this.statistics?.deaths,
        color: "danger",
        percent: (this.statistics?.deaths / total) * 100,
      },
      {
        key: { Ar: "عدد الإصابات الخطرة", En: "Major Injuries" },
        value: this.statistics?.majorInjuries,
        color: "primary",
        percent: (this.statistics?.majorInjuries / total) * 100,
      },
      {
        key: { Ar: "عدد الإصابات المتوسطة الخطورة", En: "Normal Injuries" },
        value: this.statistics?.normalInjuries,
        color: "secondary",
        percent: (this.statistics?.normalInjuries / total) * 100,
      },
      {
        key: { Ar: "عدد الإصابات الطفيفة", En: "Minor Injuries" },
        value: this.statistics?.minorInjuries,
        color: "success",
        percent: (this.statistics?.minorInjuries / total) * 100,
      },
      {
        key: { Ar: "اصابات موظفين", En: "Staff Injuries" },
        value: this.statistics?.staffInjuries,
        color: "warning",
        percent: (this.statistics?.staffInjuries / total) * 100,
      },
    ];
  }
}
