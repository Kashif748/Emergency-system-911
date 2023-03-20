import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IncidentTaskProjection } from 'src/app/api/models';

@Component({
  selector: 'app-content-tasks',
  templateUrl: './content-tasks.component.html',
  styleUrls: ['./content-tasks.component.scss'],
})
export class ContentTasksComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: IncidentTaskProjection[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;
  @Input()
  type: 'BY_MY_ORG' | 'TO_MY_ORG';

  assigneeMap = {
    org: { text: 'ORGANIZATION', bg: 'success' },
    user: { text: 'USER', bg: 'info' },
    group: { text: 'GROUP', bg: 'warning' },
  };
  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  @Output()
  reOpenTask = new EventEmitter<number>();
  constructor(
    private store: Store,
    private confirmationService: ConfirmationService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.onPageChange.emit({
      first: this.pageRequest.first,
      rows: this.pageRequest.rows,
    });
  }

  reOpen(event: Event, id) {
    console.log(event);

    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('REOPEN_TSK_CONFIREM'),
      icon: 'pi pi-question-circle',
      acceptLabel: this.translate.instant('SHARED.DIALOG.YES'),
      rejectLabel: this.translate.instant('SHARED.DIALOG.NO'),
      accept: () => this.reOpenTask.emit(id),
      reject: () => {},
    });
  }
}
