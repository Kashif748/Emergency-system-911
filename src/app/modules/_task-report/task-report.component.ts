import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';

@Component({
  selector: 'app-task-report',
  templateUrl: './task-report.component.html',
  styleUrls: ['./task-report.component.scss']
})
export class TaskReportComponent implements OnInit {

  constructor(private lang: ILangFacade) {}


  ngOnInit() {
  }

}
