import {Component, OnInit} from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-emergency-statistics-dashboard',
  templateUrl: './emergency-statistics-dashboard.component.html',
})
export class EmergencyStatisticsDashboardComponent implements OnInit {

  constructor(private lang: ILangFacade) { }

  ngOnInit(): void {
  }

}
