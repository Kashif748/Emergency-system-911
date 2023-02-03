import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  skip,
  tap,
} from 'rxjs/operators';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import { DashboardService } from '../dashboard.service';

@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrls: ['./logs.component.scss'],
})
export class LogsComponent implements OnInit {
  logs: any[] = [];
  lang = 'en';
  loading = true;
  constructor(
    private dashboardService: DashboardService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.dashboardService.workogsChange$
      .pipe(
        skip(1),
        map((data) => {
          this.logs = this.checkChanges(this.logs, data);
          this.cdr.detectChanges();
          return this.logs;
        }),
        tap(() => (this.loading = false)),
        debounceTime(10000),
        map((data: any) => {
          data.forEach((element) => {
            element.isNew = false;
          });
          this.cdr.detectChanges();
        })
      )
      .subscribe();
  }

  isPrimitive(val) {
    if (val === null) {
      return true;
    }
    if (typeof val == 'object' || typeof val == 'function') {
      return false;
    } else {
      return true;
    }
  }

  checkChanges = (previous: any[], current: any[]) => {
    if (this.isPrimitive(previous) || this.isPrimitive(current)) {
      if (previous === current) {
        return [];
      }
      return current;
    }
    if (previous.length == 0) {
      return current;
    }
    return current.map((newLog) => {
      const log = previous.find((log) => log?.id === newLog?.id);
      if (!log) {
        newLog.isNew = true;
      }
      return newLog;
    });
  };
}
