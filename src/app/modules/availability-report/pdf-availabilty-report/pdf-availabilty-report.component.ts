import { Component, OnInit } from '@angular/core';
import { ReportsService } from '@core/api/services/reports.service';
import { ILangFacade } from '@core/facades/lang.facade';
import { CommonService } from '@core/services/common.service';
import { IStorageService } from '@core/services/storage.service';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-pdf-availabilty-report',
  templateUrl: './pdf-availabilty-report.component.html',
  styleUrls: ['./pdf-availabilty-report.component.scss']
})
export class PdfAvailabiltyReportComponent implements OnInit {
  public currenUser: any;
  constructor(  private langFacade: ILangFacade,
    private reportsService: ReportsService,
    private storageService: IStorageService,
    private commonService: CommonService) { }

    ngOnInit(): void {
      this.currenUser = this.commonService.getCommonData()?.currentUserDetails;
    }


    dir$ = this.langFacade.vm$.pipe(map((s) => s.ActiveLang.dir));

    public form$ = this.storageService.getState("avaliblity-report");

}
