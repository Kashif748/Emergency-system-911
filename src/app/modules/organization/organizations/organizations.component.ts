import { Component, Inject, OnInit } from "@angular/core";
import { ILangFacade } from "@core/facades/lang.facade";

import { OrganizationsService } from "../organizations.service";

@Component({
  selector: "app-organizations",
  templateUrl: "./organizations.component.html",
  styleUrls: ["./organizations.component.scss"],
})
export class OrganizationsComponent implements OnInit {
  constructor(
    private _organizations: OrganizationsService,
    private langFacade: ILangFacade
  ) {}

  ngOnInit(): void {}
}
