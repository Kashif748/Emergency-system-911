import { Component, OnInit } from "@angular/core";
import { data } from "../public-position-data";

@Component({
  selector: "app-resources-chart",
  templateUrl: "./resources-chart.component.html",
  styleUrls: ["./resources-chart.component.scss"],
})
export class ResourcesChartComponent implements OnInit {
  resourcesChartData = data.resourcesChart;
  progressBarData = this.resourcesChartData.progressBarData;
  constructor() {}

  ngOnInit(): void {}
}
