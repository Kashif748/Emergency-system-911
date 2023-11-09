import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';

@Component({
  selector: 'app-bia-apps',
  templateUrl: './bia-app.component.html',
})
export class BiaAppComponent implements OnInit {
  constructor(private lang: ILangFacade) {}

  ngOnInit(): void {}
}
