import {ChangeDetectorRef, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {PerfectScrollbarComponent, PerfectScrollbarDirective} from 'ngx-perfect-scrollbar';
import {EventsLogService} from '@core/services/events-log.service';
import {TranslationService} from 'src/app/modules/i18n/translation.service';

@Component({
  selector: 'app-events-log',
  templateUrl: './events-log.component.html',
  styleUrls: ['./events-log.component.scss'],
})
export class EventsLogComponent implements OnInit, OnChanges {
  // Variables
  scrollTime = 2000;
  scrollingStatus = -1;
  incidents: any[] = [];
  currentLog: any[] = [];
  currentPage = 0;
  isLastPage = false;
  listSpinner = true;
  loading = false;
  loadMoreStatus = false;
  selectedIncidentId = '';
  lang = 'ar';
  @Input() filterQuery;

  // UI
  @ViewChild('scroll', {static: false})
  componentRef?: PerfectScrollbarComponent;
  @ViewChild('scroll', {static: false})
  directiveRef?: PerfectScrollbarDirective;

  constructor(
    private service: EventsLogService,
    private translationService: TranslationService,
    private cdr: ChangeDetectorRef
  ) {
  }


  ngOnChanges(changes: SimpleChanges): void {
    this.filterQuery.page = 0;
    this.filterQuery.size = 20;
    this.selectedIncidentId = null;
    this.isLastPage = false;
    this.service.filterIncidents(this.filterQuery).then((data) => {
      this.isLastPage = data['last'];
      setTimeout(() => {
        this.cdr.detectChanges();
      }, 300);
    });
  }

  ngOnInit(): void {
    this.lang = this.translationService.getSelectedLanguage();
    this.service.onIncidentsChange.subscribe((data) => {
      this.incidents = data;
      if (this.selectedIncidentId == null && this.incidents.length > 0) {
        this.selectedIncidentId = this.incidents[0].id;
        this.listSpinner = false;
      }
      this.cdr.detectChanges();
    });

    this.service.onCurrentLogChange.subscribe((data) => {
      this.currentLog = data;
      this.cdr.detectChanges();
    });
  }

  changeCurrentLog(item) {
    this.selectedIncidentId = item.id;
    this.loading = true;
    this.componentRef.directiveRef.scrollToTop(null);
    this.service.getLogForIncident(item.id).then((data) => {
      setTimeout(() => {
        this.loading = false;
        this.cdr.detectChanges();
      }, 500);
    });
  }

  loadMore() {
    if (this.loadMoreStatus) {
      return;
    }
    this.loadMoreStatus = true;
    this.filterQuery.page++;
    this.service.filterIncidents(this.filterQuery).then((data) => {
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


}
