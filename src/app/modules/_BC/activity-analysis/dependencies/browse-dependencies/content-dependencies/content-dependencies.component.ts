import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SYSTEMS } from '../../../tempData.conts';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ILangFacade } from '@core/facades/lang.facade';
import { PageRequestModel } from '@core/models/page-request.model';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { BrowseActivityDependenciesAction } from '../states/browse-dependencies.action';
import {
  ActivityDependenciesState,
  DEPENDENCIES_TYPES,
} from '@core/states/activity-analysis/dependencies/dependencies.state';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil } from 'rxjs/operators';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';

@Component({
  selector: 'app-content-dependencies',
  templateUrl: './content-dependencies.component.html',
  styleUrls: ['./content-dependencies.component.scss'],
})
export class ContentDependenciesComponent implements OnInit {
  public loading$: Observable<boolean>;

  @Input()
  page: any[];

  @Input()
  pageRequest: PageRequestModel;

  @Input()
  dependType: DEPENDENCIES_TYPES;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  DEPENDENCIES_TYPES = DEPENDENCIES_TYPES;

  noDpeend = false;
  private destroy$ = new Subject();

  constructor(
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
    private store: Store
  ) {}
  ngOnInit(): void {
    this.loading$ = this.store.select(ActivityDependenciesState.loading).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((data) => data[this.dependType])
    );
  }

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
  deleteDependinces(item) {
    console.log(item);
    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('GENERAL.DELETE_CONFIRM'),
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'mx-3 py-1',
      rejectButtonStyleClass: 'mx-3 py-1',
      accept: () => {
        const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
        const activityAnalysis = this.store.selectSnapshot(
          ActivityAnalysisState.activityAnalysis
        );
        this.store.dispatch(
          new BrowseActivityDependenciesAction.DeleteDependencies({
            activityId: activityAnalysis.id,
            cycleId: cycle.id,
            id: item.id,
            dependType: this.dependType,
          })
        );
      },
      reject: () => {},
    });
  }

  toggleDialog(id?: number) {
    this.store.dispatch(
      new BrowseActivityDependenciesAction.ToggleDialog({
        id,
        _dependType: this.dependType,
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
