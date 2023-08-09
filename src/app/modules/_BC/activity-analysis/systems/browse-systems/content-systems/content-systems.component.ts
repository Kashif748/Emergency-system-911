import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { PageRequestModel } from '@core/models/page-request.model';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { BcActivitySystems } from 'src/app/api/models';
import { SYSTEMS } from '../../../tempData.conts';
import { BrowseActivitySystemsAction } from '../../states/browse-systems.action';

@Component({
  selector: 'app-content-systems',
  templateUrl: './content-systems.component.html',
  styleUrls: ['./content-systems.component.scss'],
})
export class ContentSystemsComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: BcActivitySystems[];
  @Input()
  columns: string[];
  @Input()
  totalRecords: number;
  @Input()
  pageRequest: PageRequestModel;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  @Output()
  onDelete = new EventEmitter<string>();

  public display = false;

  form: FormGroup;

  constructor(
    private store: Store,
    private lang: ILangFacade,
    private translate: TranslateService,
    private confirmationService: ConfirmationService
  ) {}

  ngOnInit(): void {}

  deleteSystem(id, event) {
    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('GENERAL.DELETE_CONFIRM'),
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'mx-3 py-1',
      rejectButtonStyleClass: 'mx-3 py-1',
      accept: () => {
        this.onDelete.emit(id);
      },
      reject: () => {},
    });
  }
}
