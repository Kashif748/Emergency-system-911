import { Component, OnInit } from "@angular/core";
import { ILangFacade } from "@core/facades/lang.facade";

@Component({
  selector: "app-agenda-management",
  templateUrl: "./agenda-management.component.html",
  styleUrls: ["./agenda-management.component.scss"],
})
export class AgendaManagementComponent implements OnInit {
  constructor(private langFacade: ILangFacade) {}

  ngOnInit(): void {}
}
