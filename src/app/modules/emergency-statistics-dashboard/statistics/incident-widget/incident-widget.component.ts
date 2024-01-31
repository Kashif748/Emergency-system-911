import {Component, OnInit} from '@angular/core';
import {Select} from "@ngxs/store";
import {Observable} from "rxjs";
import {IncidentStatisticsState} from "@core/states/incident-statistics/incident-statistics.state";
import {IncidentStatisticData} from "../../../../api/models/incident-statistic-data";

@Component({
  selector: 'app-incident-widget',
  templateUrl: './incident-widget.component.html',
  styleUrls: ['./incident-widget.component.scss']
})
export class IncidentWidgetComponent implements OnInit {
  labels = [
    {
      nameAr: '',
      nameEn: 'Total Register Incidents',
      total: 0
    },
    {
      nameAr: '',
      nameEn: 'Close Incidents Within Time Percentage',
      total: 0
    },
    {
      nameAr: '',
      nameEn: 'Average Response Time',
      total: 0
    }
  ]
  @Select(IncidentStatisticsState.incidentStatistics)
  public incidentStatistics$: Observable<IncidentStatisticData>;

  constructor() { }

  ngOnInit(): void {
  }

}
