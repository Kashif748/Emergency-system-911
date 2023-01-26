import {Component, OnInit} from '@angular/core';

import {ILangFacade} from '@core/facades/lang.facade';

@Component({
  selector: 'app-reporting',
  templateUrl: './reporting.component.html',
  styleUrls: ['./reporting.component.scss'],
})
export class ReportingComponent {
  constructor(private langFacade: ILangFacade) {
  }

}
