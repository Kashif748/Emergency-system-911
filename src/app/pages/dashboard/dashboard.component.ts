import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DashboardService } from './dashboard.service';
import { data } from './random-data';
import { DateAdapter } from '@angular/material/core';
import { TranslationService } from 'src/app/modules/i18n/translation.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // UI
  @ViewChild(MatCalendar) dateMatCalendar: MatCalendar<Date>;
  widgets = data;
  inProgressIncidnts = [];
  // Variables
  statistics: any;
  stompClient: any;
  lang: string;

  constructor(
    private dashboardService: DashboardService,
    private dateAdapter: DateAdapter<any>,
    private translationService: TranslationService
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngOnInit(): void {
    this.dashboardService.getStatistic();
    this.dashboardService.getIds();
    this.dashboardService.getInProgressIncidnts().subscribe((data) => {
      this.inProgressIncidnts = data;
    });

    if (this.lang == 'ar') {
      this.dateAdapter.setLocale('ar');
    } else {
      this.dateAdapter.setLocale('en');
    }
  }
  @HostListener('document:visibilitychange', ['$event'])
  visibilityChange($event: Event) {
    if (document.visibilityState === 'visible') {
      this.dashboardService.getStatistic();
      this.dashboardService.getIds();
    }
  }
}
