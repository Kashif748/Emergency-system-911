import { Component, OnInit } from "@angular/core";
import { TranslationService } from "src/app/modules/i18n/translation.service";
import { DashboardService } from "../dashboard.service";
import { data } from "../random-data";

@Component({
  selector: "app-widget3",
  templateUrl: "./widget3.component.html",
  styleUrls: ["./widget3.component.scss"],
})
export class Widget3Component implements OnInit {
  widget3_data: any[] = [];
  colors = ["bg-gray-800", "bg-gray-500", "bg-gray-600", "bg-gray-300"];
  lang = "en";
  constructor(
    private _dashboardService: DashboardService,
    private translationService: TranslationService
  ) {}
  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    // this._dashboardService.getCharts().then((data: any[]) => {
    //   if (data) {
    //     this.widget3_data = data;
    //     this.calcPercent();
    //   }
    // });
  }

  calcPercent() {
    this.widget3_data.forEach((widget) => {
      let totalCount = 0;
      for (let i = 0; i < widget.chart.length; i++) {
        const element = widget.chart[i];
        totalCount += element["value"];
      }
      widget["total"] = totalCount;
    });
  }
}
