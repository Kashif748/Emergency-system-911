import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ILangFacade } from '@core/facades/lang.facade';
import { combineLatest, Observable, Subject } from 'rxjs';
import {
  BcActivities,
  BcActivityAnalysis,
  BcActivityAnalysisDto,
  BcActivityAnalysisWorkLog,
  BcActivityAnalysisWorkLogProjection,
  BcCycles,
  BcOrgHierarchy,
  BcWorkLogTypes,
} from 'src/app/api/models';
import { Select, Store } from '@ngxs/store';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { BrowseImpactAnalysisAction } from '../../../states/browse-impact-analysis.action';
import {
  auditTime,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  tap,
} from 'rxjs/operators';
import {
  ImpactLevelAction,
  ImpactMatrixAction,
  ImpactMatrixState,
  OrgActivityAction,
  OrgActivityState,
  OrgDetailAction,
  OrgDetailState,
  RtoAction,
  RtoState,
} from '@core/states';
import { ActivitySystemsAction } from '@core/states/activity-analysis/systems/systems.action';
import { ActivitySystemsState } from '@core/states/activity-analysis/systems/systems.state';
import {
  BcActivityEmployees,
  BcActivityLocations,
  BcActivitySystems,
  Bcrto,
} from '../../../../../../api/models';
import { ActivityAnalysisState } from '@core/states/activity-analysis/activity-analysis.state';
import { ActivityEmployeesState } from '@core/states/activity-analysis/employees/employees.state';
import { ActivityEmployeesAction } from '@core/states/activity-analysis/employees/employees.action';
import { ActivityAnalysisAction } from '@core/states/activity-analysis/activity-analysis.action';
import { ActivityLocationsAction } from '@core/states/activity-analysis/locations/locations.action';
import { ActivityLocationsState } from '@core/states/activity-analysis/locations/locations.state';
import { Dialog } from 'primeng/dialog';
import { BcActivityDependencyExternal } from '../../../../../../api/models/bc-activity-dependency-external';
import { BcActivityDependencyInternal } from '../../../../../../api/models/bc-activity-dependency-internal';
import { BcActivityDependencyOrg } from '../../../../../../api/models/bc-activity-dependency-org';
import { ActivityDependenciesAction } from '@core/states/activity-analysis/dependencies/dependencies.action';
import { ActivityDependenciesState } from '@core/states/activity-analysis/dependencies/dependencies.state';
import { BrowseActivityAnalysisAction } from '../../../../activity-analysis/states/browse-activity-analysis.action';
import { ActivityImpactMatrixState } from '@core/states/activity-analysis/impact-matrix/impact-matrix.state';
import { ActivityImapctMatrixAction } from '@core/states/activity-analysis/impact-matrix/impact-matrix.action';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { BrowseImpactAnalysisState } from '../../../states/browse-impact-analysis.state';
import { ActivityWorklogsState } from '@core/states/activity-analysis/worklogs/worklogs.state';
import { PerfectScrollbarComponent } from 'ngx-perfect-scrollbar';
import { ActivityWorklogsAction } from '@core/states/activity-analysis/worklogs/worklogs.action';
import { FormControl, Validators } from '@angular/forms';

interface tableRow {
  activity: BcActivities;
  selected: boolean;
}
@Component({
  selector: 'app-activities-dialog',
  templateUrl: './activities-dialog.component.html',
  styleUrls: ['./activities-dialog.component.scss'],
})
export class ActivitiesDialogComponent implements OnInit, OnDestroy {
  @ViewChild(PerfectScrollbarComponent)
  public directiveScroll: PerfectScrollbarComponent;

  @Input()
  orgHir: TreeNode[];
  @Input()
  selectedOrgHir: BcOrgHierarchy;
  @Input()
  cycleStatus: boolean;
  @Input()
  isActivityOnSection: boolean;

  page$: Observable<any[]>;
  @ViewChild(Dialog) dialog: Dialog;
  public dir$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) => (key === 'ar' ? 'rtl' : 'ltr'))
  );
  public systemPage$: Observable<BcActivitySystems[]>;
  public recoveryPage$: Observable<BcActivityAnalysis>;
  public employeePage$: Observable<BcActivityEmployees[]>;
  public locationPage$: Observable<BcActivityLocations[]>;
  public venderPage$: Observable<BcActivityDependencyExternal[]>;
  public dependencyInternalPage$: Observable<BcActivityDependencyInternal[]>;
  public orgInternalPage$: Observable<BcActivityDependencyOrg[]>;

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  public opened$: Observable<boolean>;
  viewOnly$: Observable<boolean>;

  @Select(ImpactAnalysisState.blocking)
  public blocking$: Observable<boolean>;

  @Select(OrgActivityState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(OrgActivityState.loading)
  public loading$: Observable<boolean>;

  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;

  @Select(BrowseImpactAnalysisState.progressbar)
  public progressbar$: Observable<any>;

  // Worklogs Sidebar
  @Select(ActivityWorklogsState.activityWorklogTypes)
  public activityWorklogTypes$: Observable<BcWorkLogTypes[]>;
  @Select(ActivityWorklogsState.loading)
  public worklogLoading$: Observable<boolean>;
  public worklogPage$: Observable<BcActivityAnalysisWorkLogProjection[]>;
  public selectedWorklogType: BcWorkLogTypes;
  public displayWorklogSide = false;
  note = new FormControl('', Validators.required);

  public rtosPage$: Observable<Bcrto[]>;
  public tableValue$: Observable<any[]>;

  public recoveryPageData: any;
  public systemColumns = [];
  public recoveryColumns = [];
  public employeeColumns = [];

  public impactMatrixLoading = true;
  public recoveryLoading = true;
  public systemLoading = true;
  public employLoading = true;
  public locationLoading = true;
  public venderLoading = true;
  public deptInsideLoading = true;
  public departInsideLoading = true;
  public withDuplication = true;
  public showDuplicateRes = false;

  public name = '';
  private auditLoadPage$ = new Subject<string>();
  _analysisId: number;
  _cycleID: number;
  _cycle: number;
  private auditLoadOrgPage$ = new Subject<string>();

  get editMode() {
    return this._analysisId !== undefined && this._analysisId !== null;
  }
  get viewOnly() {
    return this.route.snapshot.queryParams['_mode'] === 'viewonly';
  }

  public get asDialog() {
    return this.route.component !== ActivitiesDialogComponent;
  }

  public selectedCycle: BcCycles;
  public selectedActivities: any[] = [];

  private destroy$ = new Subject();
  @Input()
  set analysisId(v: number) {
    this.cycles$
      .pipe(
        filter((cycles) => !!cycles),
        take(1)
      )
      .subscribe((cycles) => {
        this.selectedCycle = cycles.find((cycle) => cycle.id == this._cycle);
      });
    this.selectCycle('', this._cycle);
    this._analysisId = v;
    // this.buildForm();
    if (v === undefined || v === null) {
      return;
    }
    this.impactMatrixLoading = true;
    this.recoveryLoading = true;
    this.employLoading = true;
    this.systemLoading = true;
    this.locationLoading = true;
    this.venderLoading = true;
    this.deptInsideLoading = true;
    this.departInsideLoading = true;

    this.store
      .dispatch([
        new ActivityAnalysisAction.GetActivityAnalysis({ id: v }),
        new ActivityAnalysisAction.GetCycle({ id: this._cycleID }),
      ])
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        tap((v) => {
          const activityID = this.store.selectSnapshot(
            ActivityAnalysisState.activityAnalysis
          );
          const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
          this.store.dispatch([
            new ActivityImapctMatrixAction.LoadPage({
              page: 0,
              size: 10,
              cycleId: this._cycleID,
              activityId: activityID?.activity.id,
            }),
            new ImpactMatrixAction.LoadPage({
              page: 0,
              size: 10,
              versionId: cycle?.versionId,
            }),
            new ImpactLevelAction.LoadPage({
              page: 0,
              size: 10,
              versionId: cycle?.versionId,
            }),
            new RtoAction.LoadPage({
              page: 0,
              size: 10,
              versionId: cycle?.versionId,
            }),
            new ActivitySystemsAction.LoadPage({
              page: 0,
              size: 10,
              activityId: activityID?.activity.id,
              cycleId: this._cycleID,
            }),
            new ActivityEmployeesAction.LoadPage({
              page: 0,
              size: 10,
              activityId: activityID?.activity.id,
              cycleId: this._cycleID,
            }),
            new ActivityLocationsAction.LoadPage({
              page: 0,
              size: 10,
              activityId: activityID?.activity.id,
              cycleId: this._cycleID,
            }),
            new ActivityDependenciesAction.LoadDependencyExternal({
              page: 0,
              size: 10,
              activityId: activityID?.activity.id,
              cycleId: this._cycleID,
            }),
            new ActivityDependenciesAction.LoadDependencyInternal({
              page: 0,
              size: 10,
              activityId: activityID?.activity.id,
              cycleId: this._cycleID,
            }),
            new ActivityDependenciesAction.LoadDependencyOrg({
              page: 0,
              size: 10,
              activityId: activityID?.activity.id,
              cycleId: this._cycleID,
            }),
            new ActivityWorklogsAction.LoadWorklogsTypes(),
          ]);

          this.rtosPage$ = this.store.select(RtoState.page).pipe(
            filter((p) => !!p),
            map((page) => [...page].sort((a, b) => a.id - b.id))
          );

          this.tableValue$ = combineLatest([
            this.store.select(ActivityImpactMatrixState.page),
            this.store.select(ImpactMatrixState.page),
            this.store.select(RtoState.page),
          ]).pipe(
            takeUntil(this.destroy$),
            filter(
              ([activityImpact, impactMatrix, rtos]) =>
                !!activityImpact && !!impactMatrix && !!rtos
            ),
            map(([activityImpact, impactMatrix, rtos]) => {
              const table = [];
              let impactTotal = 0;
              impactMatrix.forEach((impact) => {
                const selectdImpact = activityImpact.find(
                  (item) => item.id === impact.bcImpactTypes.id
                );
                let row = {
                  impactType: impact.bcImpactTypes,
                  bcRto: [],
                };
                rtos.forEach((rto) => {
                  let rowValue;
                  let bcImpactLevelId = null;
                  if (selectdImpact) {
                    const selectdRto = selectdImpact.bcRto.find(
                      (item) => item.id === rto.id
                    );
                    rowValue = selectdRto;
                    if (selectdRto?.bcImpactLevels) {
                      bcImpactLevelId = selectdRto.bcImpactLevels.id;
                      impactTotal++;
                    }
                  }
                  row.bcRto.push({
                    bcImpactLevelId: bcImpactLevelId,
                    bcRtoId: rto?.id,
                    value: rowValue,
                  });
                });

                table.push(row);
              });

              impactTotal =
                (impactTotal * 100) / (rtos?.length * impactMatrix?.length);

              this.store.dispatch(
                new BrowseActivityAnalysisAction.setImpactTotal({ impactTotal })
              );
              return table;
            })
          );

          this.systemPage$ = this.store
            .select(ActivitySystemsState.page)
            .pipe(filter((p) => !!p));
          this.store
            .select(ActivityAnalysisState.activityAnalysis)
            .pipe(
              filter((p) => !!p),
              take(1)
            )
            .subscribe((data) => {
              this.recoveryPageData = data;
            });
          this.employeePage$ = this.store
            .select(ActivityEmployeesState.page)
            .pipe(filter((p) => !!p));
          this.locationPage$ = this.store
            .select(ActivityLocationsState.page)
            .pipe(filter((p) => !!p));
          this.venderPage$ = this.store
            .select(ActivityDependenciesState.activityDependencyExternal)
            .pipe(filter((p) => !!p));
          this.dependencyInternalPage$ = this.store
            .select(ActivityDependenciesState.activityDependencyInternal)
            .pipe(filter((p) => !!p));
          this.orgInternalPage$ = this.store
            .select(ActivityDependenciesState.activityDependencyOrg)
            .pipe(filter((p) => !!p));
          this.worklogPage$ = this.store
            .select(ActivityWorklogsState.page)
            .pipe(
              filter((p) => !!p),
              tap(() =>
                setTimeout(() => {
                  this.scrollBottom();
                }, 400)
              )
            );
        })
      )
      .subscribe((v) => {
        this.impactMatrixLoading = false;
        this.recoveryLoading = false;
        this.employLoading = false;
        this.systemLoading = false;
        this.locationLoading = false;
        this.venderLoading = false;
        this.deptInsideLoading = false;
        this.departInsideLoading = false;
        this.cdr.detectChanges();
      });
  }
  constructor(
    private route: ActivatedRoute,
    private lang: ILangFacade,
    private store: Store,
    private cdr: ChangeDetectorRef,
    private translateObj: TranslateObjPipe
  ) {}

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => {
        const opened = params['_dialog'] === 'activities';
        if (opened) {
          this.selectedActivities = [];
          this._cycle = params['_cycle'];
          this._cycleID = params['_cycleId'];
          this.analysisId = params['_id'];
        }
        return opened;
      })
    );

    this.loadPage(null, '', true);
    this.page$ = combineLatest([
      this.store.select(OrgActivityState.idsList),
      this.store.select(OrgActivityState.page),
    ]).pipe(
      map(([ids, activities]) => {
        this.selectedActivities = [];
        let tableRows = activities?.map((activity) => {
          let tableRow = {
            ...activity,
            disabled: false,
            selected: false,
            dublicated: false,
          };
          if (ids && ids.includes(activity.id)) {
            tableRow.disabled = true;
          }
          return tableRow;
        });
        return tableRows;
      })
    );

    this.auditLoadPage$
      .pipe(takeUntil(this.destroy$), auditTime(1000))
      .subscribe((search: string) => {
        this.store.dispatch(
          new OrgActivityAction.LoadPage({
            page: 0,
            size: 100,
            filters: { name: search },
          })
        );
      });
  }
  async submit() {
    if (!this.selectedActivities || !this.selectedCycle) {
      return;
    }
    let activities: BcActivityAnalysisDto[];
    activities = this.selectedActivities.map((activity) => {
      return {
        activityId: activity.id,
        cycleId: this.selectedCycle?.id,
        orgHirId: this.selectedOrgHir?.id
      };
    });

    await this.store
      .dispatch(new BrowseImpactAnalysisAction.SetCycleActivities(activities))
      .toPromise();

    if (this.withDuplication) {
      const createdActivies = this.store.selectSnapshot(
        ImpactAnalysisState.selectedActivityAnalysis
      );
      console.log(createdActivies);

      await this.store
        .dispatch(
          new BrowseImpactAnalysisAction.duplicateActivities(createdActivies)
        )
        .toPromise();
      this.showDuplicateRes = true;
    } else {
      this.store.dispatch([new BrowseImpactAnalysisAction.ToggleDialog({})]);
      this.showDuplicateRes = false;
    }
    this.store.dispatch([new BrowseImpactAnalysisAction.LoadPage()]);
  }

  loadPage(page: LazyLoadEvent, search?: string, direct = false) {
    this.showDuplicateRes = false;
    if (direct) {
      this.store.dispatch(
        new OrgActivityAction.LoadPage({
          page: 0,
          size: 100,
          filters: { name: this.name },
        })
      );
      return;
    }
    this.auditLoadPage$.next(search);
  }
  activityClicked(row) {
    if (row.disabled) return;
    row.selected = !row.selected;
    row.dublicated = row.selected; //default value for dublicate will be true whenever user select the row
    if (row.selected) {
      this.selectedActivities.push(row);
    } else {
      this.selectedActivities = this.selectedActivities.filter(
        (activity) => activity?.id !== row?.id
      );
    }
  }
  selectAll(page) {
    page.forEach((activiy) => this.activityClicked(activiy));
  }

  toggleDialog() {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.ToggleDialog({ dialog: 'activities' })
    );
    if (this.withDuplication) {
      this.showDuplicateRes = false;
      this.store.dispatch(new BrowseImpactAnalysisAction.Reset());
    }
  }
  close() {
    this.displayWorklogSide = false;
    this.store.dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
  }

  filterOrgHir(event) {
    this.auditLoadOrgPage$.next(event);
  }
  nodeExpand(node: TreeNode) {
    if (node.children.length === 0) {
      this.store.dispatch(
        new OrgDetailAction.GetOrgHierarchySearch({
          page: 0,
          size: 100,
          parentId: parseInt(node?.key),
        })
      );
    }
  }

  selectCycle(event?, cycleId?) {
    if (event) {
      this.selectedCycle = event?.value;
    }
    setTimeout(() => {
      this.store.dispatch(
        new OrgActivityAction.loadIdsList({
          cycleId: this.selectedCycle?.id ? this.selectedCycle.id : cycleId,
          orgHierarchyId: this.selectedOrgHir?.id,
        })
      );
    }, 3000);
  }
  selectDivision(event: TreeNode) {
    if (event) {
      this.selectDivision = event?.data;
    }
    this.store.dispatch(
      new OrgActivityAction.loadIdsList({
        cycleId: this.selectedCycle?.id,
        orgHierarchyId: event?.data?.id,
      })
    );
  }

  // Worklogs
  openWorklogSide() {
    if (this.displayWorklogSide) return;
    this.displayWorklogSide = true;

    this.activityWorklogTypes$
      .pipe(
        take(1),
        map((worklogTypes) =>
          worklogTypes.find((worklogType) => worklogType?.modifiable)
        ),
        filter((worklogType) => !!worklogType),
        tap((worklogType) => {
          this.selectedWorklogType = worklogType;
          this.store.dispatch([
            new ActivityWorklogsAction.LoadPage({
              activityAnalysisId: this._analysisId,
              page: 0,
              size: 100,
              resetPage: true,
              actionTypeId: worklogType?.id,
            }),
          ]);
        })
      )
      .subscribe();
  }
  async keydown(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.submitWorklog();
    }
  }
  async submitWorklog() {
    if (this.note.invalid) {
      return;
    }
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    let worklog: BcActivityAnalysisWorkLog = {
      notes: this.note.value,
      activityAnalysis: activityAnalysis,
    };
    this.store
      .dispatch([new ActivityWorklogsAction.Create(worklog)])
      .pipe(
        switchMap(() =>
          this.store.select(ActivityWorklogsState.activityWorklog)
        ),
        filter((p) => !!p),
        tap(async (data) => {
          this.note.reset();
        })
      )
      .subscribe();
  }
  filterWorklogs(event) {
    if (this.selectedWorklogType?.id == event.id) {
      this.selectedWorklogType = null;
    } else {
      this.selectedWorklogType = event;
    }
    const activityAnalysis = this.store.selectSnapshot(
      ActivityAnalysisState.activityAnalysis
    );
    this.store.dispatch(
      new ActivityWorklogsAction.LoadPage({
        page: 0,
        size: 100,
        actionTypeId: this.selectedWorklogType?.id,
        activityAnalysisId: activityAnalysis?.id,
        resetPage: true,
      })
    );
  }
  scrollBottom() {
    if (!this.directiveScroll) return;
    this.directiveScroll.directiveRef.scrollToBottom(0, 100);
  }

  // End worklogs
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
