import {Component} from '@angular/core';
import {CommonService} from 'src/app/core/services/common.service';
import {AppCommonData} from '@core/entities/AppCommonData';

export interface IncidentArcGisMapInfo {
  incidentId: number;
  orgName: string;
  emergencyLevel: string;
  priority: string;
  incidentDate: string;
}

@Component({
  selector: 'app-report-incident',
  templateUrl: './report-incident.component.html',
  styleUrls: ['./report-incident.component.scss'],
})
export class ReportIncidentComponent {
  // Variables
  lang = 'en';
  org: any;
  commonData: AppCommonData;

  constructor(private commonService: CommonService) {
    this.commonData = this.commonService.getCommonData();
    this.org = this.commonData?.currentOrgDetails?.code;
  }

}
