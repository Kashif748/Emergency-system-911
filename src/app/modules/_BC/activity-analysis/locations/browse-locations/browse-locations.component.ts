import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidators } from '@shared/validators/generic-validators';
import { BrowseActivityLocationsAction } from '../states/browse-locations.action';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { ActivityLocationsState } from '@core/states/activity-analysis/locations/locations.state';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { TranslateService } from '@ngx-translate/core';
import { BrowseActivityAnalysisState } from '../../states/browse-activity-analysis.state';
import { BrowseActivityLocationsState } from '../states/browse-locations.state';
import { ActivityAnalysisStatusAction, BcActivityLocations } from 'src/app/api/models';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import {BrowseActivityEmployeesAction} from "../../employees/states/browse-employees.action";

@Component({
  selector: 'app-browse-locations',
  templateUrl: './browse-locations.component.html',
  styleUrls: ['./browse-locations.component.scss'],
})
export class BrowseLocationsComponent implements OnInit {
  public page$: Observable<BcActivityLocations[]>;

  @Select(ActivityLocationsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ActivityLocationsState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseActivityLocationsState.state)
  public state$: Observable<BrowseActivityLocationsState>;

  @Select(ActivityAnalysisState.activityStatus)
  public activityStatus$: Observable<ActivityAnalysisStatusAction>;


  private destroy$ = new Subject();

  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade
  ) {}

  ngOnInit(): void {
    combineLatest([
      this.store.select(ActivityAnalysisState.activityAnalysis),
      this.store.select(ActivityAnalysisState.cycle),
    ])
      .pipe(
        takeUntil(this.destroy$),
        tap(([activity, cycle]) => {
          this.loadPage();
        })
      )
      .subscribe();
    const userActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
      {
        label: this.translate.instant('ACTIONS.DELETE'),
        icon: 'pi pi pi-trash',
      },
    ] as MenuItem[];
    this.page$ = this.store.select(ActivityLocationsState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                ...userActions[0],
                command: () => {
                  this.openDialog(u.id);
                },
                disabled: !u.isActive,
              },
              {
                ...userActions[1],
                command: () => {
                  this.delete(u.id);
                },
                disabled: !u.isActive,
              }
            ],
          };
        })
      )
    );
  }

  delete(id) {
    this.store
      .dispatch(new BrowseActivityLocationsAction.Delete({ id }))
      .toPromise()
      .then(() => {
        this.loadPage();
      });
  }

  openDialog(id?: number) {
    this.store.dispatch(new BrowseActivityLocationsAction.ToggleDialog({ id }));
  }
  public loadPage(event?: LazyLoadEvent) {
    const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    this.store.dispatch(
      new BrowseActivityLocationsAction.LoadLocations({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
        cycleId: cycle?.id,
        activityId: activityAnalysis.activity.id,
      })
    );
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
