import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';

@Component({
  selector: 'app-user-mgmt',
  templateUrl: './user-mgmt.component.html',
})
export class UserMgmtComponent implements OnInit {
  constructor(private lang: ILangFacade) {}

  ngOnInit(): void {}
}
