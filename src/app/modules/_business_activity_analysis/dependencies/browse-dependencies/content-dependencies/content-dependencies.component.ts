import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SYSTEMS } from '../../../tempData.conts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { PageRequestModel } from '@core/models/page-request.model';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { BrowseActivityDependenciesAction } from '../states/browse-dependencies.action';

@Component({
  selector: 'app-content-dependencies',
  templateUrl: './content-dependencies.component.html',
  styleUrls: ['./content-dependencies.component.scss'],
})
export class ContentDependenciesComponent implements OnInit {
  @Input()
  loading: boolean;
  @Input()
  page: any[];

  @Input()
  pageRequest: PageRequestModel;

  @Input()
  dependType: string;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  noDpeend = false;
  constructor(
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private store: Store
  ) {}
  ngOnInit(): void {}

  confirm(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('DEPENDENCIES.NO_DPEEND_CONFIREM'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        //confirm action
      },
      reject: () => {
        this.noDpeend = !this.noDpeend;

        //reject action
      },
    });
  }

  toggleDialog(id?: number) {
    this.store.dispatch(
      new BrowseActivityDependenciesAction.ToggleDialog({ id })
    );
  }
}
