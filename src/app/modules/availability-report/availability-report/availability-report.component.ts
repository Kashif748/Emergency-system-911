import { Component, OnInit } from "@angular/core";
import { ILangFacade } from "@core/facades/lang.facade";

@Component({
  selector: "app-availability-report",
  templateUrl: "./availability-report.component.html",
  styleUrls: ["./availability-report.component.scss"],
})
export class AvailabilityReportComponent implements OnInit {
  constructor(private langFacade: ILangFacade) {}

  ngOnInit(): void {}
}
