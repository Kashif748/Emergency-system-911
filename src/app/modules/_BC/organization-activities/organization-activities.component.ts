import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';

@Component({
  selector: 'app-org-activities',
  templateUrl: './organization-activities.component.html',
})
export class OrganizationActivitiesComponent implements OnInit {
  constructor(private lang: ILangFacade) {}

  ngOnInit(): void {}
}
