import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { BcActivitySystems, BcSystems } from 'src/app/api/models';
import { ActivitySystemsState } from '@core/states/activity-analysis/systems/systems.state';
import {
  BrowseActivitySystemsState,
  BrowseActivitySystemsStateModel,
} from '../../states/browse-systems.state';
import { filter, map, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { SystemsState } from '@core/states/bc-setup/systems/systems.state';
import { BrowseActivitySystemsAction } from '../../states/browse-systems.action';
import { SystemsAction } from '@core/states/bc-setup/systems/systems.action';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';

@Component({
  selector: 'app-systems-dialog',
  templateUrl: './systems-dialog.component.html',
  styleUrls: ['./systems-dialog.component.scss'],
})
export class SystemsDialogComponent implements OnInit, OnDestroy {
  public page$: Observable<BcSystems[]>;

  public opened$: Observable<boolean>;

  @Select(SystemsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(SystemsState.loading)
  public loading$: Observable<boolean>;

  @Select(ActivitySystemsState.blocking)
  blocking$: Observable<boolean>;

  @Select(BrowseActivitySystemsState.state)
  public state$: Observable<BrowseActivitySystemsStateModel>;

  public selectedBCSystem: BcSystems;

  public columns = [
    { name: 'ACTIVITY_NAME', code: 'userName', disabled: true },
    {
      name: 'ACTIVITY_FEQ',
      code: 'nameAr',
    },
  ];

  currentSystem: BcActivitySystems;
  _systemId: number;

  get editMode() {
    return this._systemId !== undefined && this._systemId !== null;
  }
  set systemId(v: number) {
    this._systemId = v;
    if (v === undefined || v === null) {
      const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
      const activityAnalysis = this.store.selectSnapshot(
        ActivityAnalysisState.activityAnalysis
      );
      this.currentSystem = {
        cycle: {
          id: cycle.id,
        },
        isActive: true,
        activity: {
          internal: activityAnalysis.activity?.internal,
          id: activityAnalysis.activity.id,
        },
      };
      return;
    }
    this.store
      .dispatch(new BrowseActivitySystemsAction.GetSystem({ id: v }))
      .pipe(
        switchMap(() => this.store.select(ActivitySystemsState.activitySystem)),
        takeUntil(this.destroy$),
        take(1),
        tap((system) => {
          this.currentSystem = system;
          this.selectedBCSystem = system?.system;
        })
      );
  }

  destroy$ = new Subject();
  constructor(private route: ActivatedRoute, private store: Store) {
    this.route.queryParams
      .pipe(
        map((params) => params['_id']),
        takeUntil(this.destroy$)
      )
      .subscribe((id) => {
        this.systemId = id;
      });
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened'),
      tap((opened) => {
        if (opened) {
          this.loadPage();
        }
      })
    );
    this.page$ = this.store
    .select(SystemsState.page)
    .pipe(filter((p) => !!p),
    );
  }

  public loadPage() {
    this.store.dispatch(
      new SystemsAction.LoadPage({
        page: 0,
        size: 50,
      })
    );
  }
  submit() {
    if (!this.selectedBCSystem) {
      return;
    }
    this.currentSystem = {
      ...this.currentSystem,
      system: {
        id: this.selectedBCSystem?.id,
        orgStructure: this.selectedBCSystem.orgStructure,
      },
    };
    if (this.editMode) {
      (this.currentSystem.id = this._systemId),
        this.store.dispatch(
          new BrowseActivitySystemsAction.Update(this.currentSystem)
        );
    } else {
      this.store.dispatch(
        new BrowseActivitySystemsAction.Create(this.currentSystem)
      );
    }
  }
  toggleDialog(id?: number) {
    this.store.dispatch(new BrowseActivitySystemsAction.ToggleDialog({ id }));
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
