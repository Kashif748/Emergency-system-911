import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';

@Component({
  selector: 'app-task-mgmt',
  templateUrl: './task-mgmt.component.html',
  styleUrls: ['./task-mgmt.component.scss']
})
export class TaskMgmtComponent implements OnInit {

  constructor(private lang: ILangFacade) {}


  ngOnInit() {
  }

}
