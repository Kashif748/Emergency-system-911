import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { BcActivitySystems, BcSystems } from 'src/app/api/models';
import { ActivitySystemsState } from '@core/states/activity-analysis/systems/systems.state';
import {
  BrowseActivitySystemsState,
  BrowseActivitySystemsStateModel,
} from '../../states/browse-systems.state';
import {
  auditTime,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { SystemsState } from '@core/states/bc-setup/systems/systems.state';
import { BrowseActivitySystemsAction } from '../../states/browse-systems.action';
import { SystemsAction } from '@core/states/bc-setup/systems/systems.action';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivitySystemsAction } from '@core/states/activity-analysis/systems/systems.action';
import { TranslateService } from '@ngx-translate/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { LazyLoadEvent } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericValidators } from '@shared/validators/generic-validators';

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

  display = false;
  private auditLoadPage$ = new Subject<string>();
  form: FormGroup;

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
  constructor(
    private route: ActivatedRoute,
    private store: Store,
    private translate: TranslateService,
    private formBuilder: FormBuilder
  ) {
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
    this.buildForm();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'opened'),
      tap((opened) => {
        if (opened) {
          this.loadPage();
          this.selectedBCSystem = null;
          const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
          const activityAnalysis = this.store.selectSnapshot(
            ActivityAnalysisState.activityAnalysis
          );
          this.store.dispatch(
            new ActivitySystemsAction.loadIdsList({
              cycleId: cycle.id,
              activityId: activityAnalysis.activity.id,
            })
          );
        }
      })
    );

    this.page$ = combineLatest([
      this.store.select(ActivitySystemsState.idsList),
      this.store.select(SystemsState.page),
    ]).pipe(
      filter(([ids, systems]) => !!ids && !!systems),
      map(([ids, systems]) => {
        this.selectedBCSystem = null;
        let tableRows = systems.map((activity) => {
          let tableRow = {
            ...activity,
            selected: false,
          };
          if (ids && ids.includes(activity.id)) {
            tableRow.selected = true;
            // this.selectedActivities.push(tableRow);
          }
          return tableRow;
        });
        console.log(this.selectedBCSystem);
        return tableRows;
      })
    );

    this.auditLoadPage$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search: string) => {
        console.log(this.translate.currentLang);
        this.loadPage(search, true);
      });
  }

  buildForm() {
    this.form = this.formBuilder.group({
      nameAr: [null, [Validators.required, GenericValidators.arabic]],
      nameEn: [null, [Validators.required, GenericValidators.english]],
      orgHierarchy: [null, [Validators.required]],
      isActive: true,
      id: null,
    });
  }
  public loadPage(search?: string, direct = false) {
    if (direct) {
      this.store.dispatch(
        new SystemsAction.LoadPage({
          page: 0,
          size: 50,
          filters: { name: search },
        })
      );
      return;
    }
    this.auditLoadPage$.next(search);
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
  closeCreateDialog() {
    this.display = false;
    this.loadPage();
  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
