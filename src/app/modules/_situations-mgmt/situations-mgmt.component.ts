import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';

@Component({
  selector: 'app-situations-mgmt',
  templateUrl: './situations-mgmt.component.html',
  styleUrls: ['./situations-mgmt.component.scss']
})
export class SituationsMgmtComponent implements OnInit {

  constructor(private lang: ILangFacade) {}

  ngOnInit(): void {
  }

}
