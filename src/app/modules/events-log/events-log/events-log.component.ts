import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  PerfectScrollbarComponent,
  PerfectScrollbarDirective,
} from 'ngx-perfect-scrollbar';
import {TranslationService} from '../../i18n/translation.service';
import {EventsLogService} from '@core/services/events-log.service';

@Component({
  selector: 'app-events-log',
  templateUrl: './events-log.component.html',
  styleUrls: ['./events-log.component.scss'],
})
export class EventsLogComponent implements OnInit {
  // UI
  @ViewChild('scroll', {static: false})
  componentRef?: PerfectScrollbarComponent;
  @ViewChild('scroll', {static: false})
  directiveRef?: PerfectScrollbarDirective;
  // Variables
  scrollTime = 2000;
  scrollingStatus = 0;
  incidents: any[] = [];
  filteredIncidents: any[] = [];
  currentIncidentTitle = '';
  currentLog: any[] = [];
  currentPage = 0;
  isLastPage = false;
  listSpinner = true;
  loading = false;
  loadMoreStatus = false;
  currentTab = '';
  lang = 'ar';

  constructor(
    private service: EventsLogService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.service.onIncidentsChange.subscribe((data) => {
      this.incidents = data;
      this.filteredIncidents = data;
      if (this.incidents[0].id) {
        this.currentIncidentTitle = this.incidents[0].subject;
        this.currentTab = this.incidents[0].id;
        this.listSpinner = false;
      }
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 100);
    });

    this.service.onCurrentLogChange.subscribe((data) => {
      this.currentLog = data;
    });
  }

  applyFilter(event: Event) {
    this.listSpinner = true;
    setTimeout(() => {
      this.listSpinner = false;
      this.cdr.detectChanges();
    }, 500);

    const filterValue = (event.target as HTMLInputElement).value;
    if (
      typeof filterValue == 'string' &&
      filterValue.replace(/\s/g, '').length
    ) {
      this.filteredIncidents = this.incidents.filter((item) => {
        if (
          item.subject &&
          item.subject.toLowerCase().indexOf(filterValue) > -1
        ) {
          return item;
        }
        if (
          item.description &&
          item.description.toLowerCase().indexOf(filterValue) > -1
        ) {
          return item;
        }
      });
    } else {
      this.filteredIncidents = this.incidents;
    }
  }

  changeCurrentLog(item) {
    this.currentTab = item.id;
    this.loading = true;
    this.currentIncidentTitle = item.subject;
    this.service.getLogForIncident(item.id).then((data) => {
      setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
        this.scrollToBottom();
      }, 500);
    });
  }

  loadMore() {
    if (this.loadMoreStatus) {
      return;
    }
    this.loadMoreStatus = true;
    this.service.getIncidentsByPage(++this.currentPage).then((data) => {
      this.isLastPage = data['last'];
      setTimeout(() => {
        this.loadMoreStatus = false;
        this.cdr.detectChanges();
      }, 300);
    });
  }

  public replayScroll(): void {
    this.scrollingStatus = 0;
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToTop(null, 300);
      setTimeout(() => {
        this.scrollToBottom();
      }, 500);
      this.cdr.detectChanges();
    }
  }

  public scrollToBottom(): void {
    this.scrollingStatus = 1;
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToBottom(
        null,
        this.currentLog.length * this.scrollTime
      );
      this.cdr.detectChanges();
    }
  }

  public scrollFinish(event: any): void {
    this.replayScroll();
    setTimeout(() => {
      this.scrollToBottom();
    }, 500);
  }

  pauseScrolling() {
    const position = this.componentRef.directiveRef.position(true);
    this.scrollingStatus = -1;
    if (this.componentRef && this.componentRef.directiveRef) {
      this.componentRef.directiveRef.scrollToY(Number(position.y), 0);
    }
    this.cdr.detectChanges();
  }
}
