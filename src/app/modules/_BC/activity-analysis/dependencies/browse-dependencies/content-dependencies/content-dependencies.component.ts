import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { PageRequestModel } from '@core/models/page-request.model';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { BrowseActivityDependenciesAction } from '../states/browse-dependencies.action';
import {
  ActivityDependenciesState,
  DEPENDENCIES_TYPES,
} from '@core/states/activity-analysis/dependencies/dependencies.state';
import { Observable, Subject } from 'rxjs';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import {
  BcActivityDependencyExternal,
  BcActivityDependencyInternal,
  BcActivityDependencyOrg,
} from 'src/app/api/models';
import { ActivityAnalysisStatusAction } from '../../../../../../api/models/activity-analysis-status-action';

@Component({
  selector: 'app-content-dependencies',
  templateUrl: './content-dependencies.component.html',
  styleUrls: ['./content-dependencies.component.scss'],
})
export class ContentDependenciesComponent implements OnInit, OnChanges {
  public loading$: Observable<boolean>;
  public noDpend$: Observable<boolean>;
  @Input()
  page: any[];
  localPage: any[];

  @Input()
  pageRequest: PageRequestModel;

  @Input()
  dependType: DEPENDENCIES_TYPES;

  @Input()
  activityStatus: ActivityAnalysisStatusAction;

  @Output()
  onPageChange = new EventEmitter<LazyLoadEvent>();

  DEPENDENCIES_TYPES = DEPENDENCIES_TYPES;

  noDpeendCssBtn = '';
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
    this.noDpend$ = this.store.select(ActivityDependenciesState.noDepend).pipe(
      takeUntil(this.destroy$),
      map((data) => data[this.dependType]),
      tap((noDepend) => {
        this.noDpeendCssBtn = noDepend
          ? 'p-button-sm'
          : 'p-button-sm p-button-outlined';
      })
    );
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['page'] && this.page) {
      this.localPage = this.page.filter((item) => item?.isFound);
    }
  }

  confirm(event: Event, pageLength, noDepend: boolean) {
    if (pageLength > 0) return;
    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('DEPENDENCIES.NO_DPEEND_CONFIREM'),
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        if (noDepend) {
          const isFoundItem = this.page?.find((item) => !item.isFound);
          this.deleteItem(isFoundItem);
        } else {
          const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
          const activityAnalysis = this.store.selectSnapshot(
            ActivityAnalysisState.activityAnalysis
          );
          const dependency = {
            isFound: false,
            isActive: true,
            activity: {
              internal: activityAnalysis?.activity?.internal,
              id: activityAnalysis.activity.id,
            },
            cycle: {
              id: cycle.id,
            },
          };
          switch (this.dependType) {
            case DEPENDENCIES_TYPES.DEPENDENCY_INTERNAL:
              this.store.dispatch(
                new BrowseActivityDependenciesAction.CreateInternal(
                  dependency as BcActivityDependencyInternal
                )
              );
              break;
            case DEPENDENCIES_TYPES.DEPENDENCY_EXTERNAL:
              this.store.dispatch(
                new BrowseActivityDependenciesAction.CreateExternal(
                  dependency as BcActivityDependencyExternal
                )
              );
              break;
            case DEPENDENCIES_TYPES.DEPENDENCY_ORG:
              this.store.dispatch(
                new BrowseActivityDependenciesAction.CreateOrg(
                  dependency as BcActivityDependencyOrg
                )
              );
              break;

            default:
              break;
          }
        }
      },
      reject: () => {},
    });
  }
  deleteDependinces(event, item) {
    this.confirmationService.confirm({
      target: event.target,
      message: this.translate.instant('GENERAL.DELETE_CONFIRM'),
      icon: 'pi pi-exclamation-triangle',
      acceptButtonStyleClass: 'mx-3 py-1',
      rejectButtonStyleClass: 'mx-3 py-1',
      accept: () => {
        this.deleteItem(item);
      },
      reject: () => {},
    });
  }

  deleteItem(item) {
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    this.store.dispatch(
      new BrowseActivityDependenciesAction.DeleteDependencies({
        activityId: activityAnalysis.activity.id,
        cycleId: cycle.id,
        id: item.id,
        dependType: this.dependType,
      })
    );
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
