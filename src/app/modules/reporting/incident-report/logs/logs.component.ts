import { Component, Input, OnInit } from "@angular/core";
import { MatCheckboxChange } from "@angular/material/checkbox";

import { BehaviorSubject } from "rxjs";
import { map, tap } from "rxjs/operators";

import { TranslationService } from "src/app/modules/i18n/translation.service";
import { IncidentsService } from "src/app/_metronic/core/services/incidents.service";

@Component({
  selector: "app-logs",
  templateUrl: "./logs.component.html",
  styleUrls: ["./logs.component.scss"],
})
export class LogsComponent implements OnInit {
  @Input() incidentId: number;
  public dir$ = this.translationService.lang$.pipe(
    map((s) => (s == "ar" ? "rtl" : "ltr"))
  );
  private workLogs = [];
  public workLogs$ = new BehaviorSubject<any[]>([]);
  private workLogsPageIndex = 0;
  private workLogsCompleted = false;
  private loading = false;

  constructor(
    private translationService: TranslationService,
    private incidentService: IncidentsService
  ) {}


  async ngOnInit() {
    this.initLogs();
    await this._nextWorkLogPage();
  }

  onCheck(event: MatCheckboxChange, log) {
    const filteredLog = this.workLogs.find((l) => l.id == log.id);
    filteredLog.checked = event.checked;
    this.workLogs$.next(this.workLogs);
  }


  private initLogs() {
    this.workLogs = [];
    this.workLogsPageIndex = 0;
    this.workLogsCompleted = false;
  }
  async _nextWorkLogPage() {
    if (this.workLogsCompleted || this.loading) {
      return;
    }

    this.loading = true;
    await this.incidentService
      .getWorkLogsDs(this.incidentId, "", "desc", this.workLogsPageIndex, 20)
      .pipe(
        map((r) => r.result),
        tap((page) => {
          this.workLogs.push(...page.content);
          this.workLogs$.next(this.workLogs);
          this.loading = false;
          this.workLogsCompleted = page.content?.length == 0;
        })
      )
      .toPromise();
    this.workLogsPageIndex++;
  }

}
