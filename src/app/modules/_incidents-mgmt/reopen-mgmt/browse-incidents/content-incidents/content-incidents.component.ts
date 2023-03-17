import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IncidentProjection } from 'src/app/api/models';

@Component({
  selector: 'app-content-incidents',
  templateUrl: './content-incidents.component.html',
  styleUrls: ['./content-incidents.component.scss'],
})
export class ContentIncidentsComponent implements OnInit {
  @Input()
  view: 'TABLE' | 'CARDS';
  @Input()
  loading: boolean;
  @Input()
  page: IncidentProjection[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  @Output()
  reOpenIncidint = new EventEmitter<number>();

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

  openView(id?: number) {
    // this.store.dispatch(new BrowseIncidentsAction.OpenView({ taskId: id }));
  }

  reOpen(event: Event, id) {
    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('REOPEN_INC_CONFIREM'),
      icon: 'pi pi-question-circle',
      accept: () => this.reOpenIncidint.emit(id),
      reject: () => {},
    });
  }
}
