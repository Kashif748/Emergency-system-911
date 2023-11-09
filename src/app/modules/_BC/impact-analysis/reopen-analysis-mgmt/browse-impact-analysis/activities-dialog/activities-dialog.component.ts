import {ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ILangFacade} from '@core/facades/lang.facade';
import {combineLatest, Observable, Subject} from 'rxjs';
import {BcActivities, BcActivityAnalysis, BcActivityAnalysisDto, BcCycles,} from 'src/app/api/models';
import {Select, Store} from '@ngxs/store';
import {ImpactAnalysisState} from '@core/states/impact-analysis/impact-analysis.state';
import {BrowseImpactAnalysisAction} from '../../../states/browse-impact-analysis.action';
import {auditTime, filter, map, take, takeUntil, tap} from 'rxjs/operators';
import {
  ImpactLevelAction,
  ImpactMatrixAction,
  ImpactMatrixState,
  OrgActivityAction,
  OrgActivityState,
  RtoAction,
  RtoState
} from '@core/states';
import {ActivitySystemsAction} from "@core/states/activity-analysis/systems/systems.action";
import {ActivitySystemsState} from "@core/states/activity-analysis/systems/systems.state";
import {BcActivityEmployees, BcActivityLocations, BcActivitySystems, Bcrto} from "../../../../../../api/models";
import {ActivityAnalysisState} from "@core/states/activity-analysis/activity-analysis.state";
import {ActivityEmployeesState} from "@core/states/activity-analysis/employees/employees.state";
import {ActivityEmployeesAction} from "@core/states/activity-analysis/employees/employees.action";
import {ActivityAnalysisAction} from "@core/states/activity-analysis/activity-analysis.action";
import {ActivityLocationsAction} from "@core/states/activity-analysis/locations/locations.action";
import {ActivityLocationsState} from "@core/states/activity-analysis/locations/locations.state";
import {Dialog} from "primeng/dialog";
import {BcActivityDependencyExternal} from "../../../../../../api/models/bc-activity-dependency-external";
import {BcActivityDependencyInternal} from "../../../../../../api/models/bc-activity-dependency-internal";
import {BcActivityDependencyOrg} from "../../../../../../api/models/bc-activity-dependency-org";
import {ActivityDependenciesAction} from "@core/states/activity-analysis/dependencies/dependencies.action";
import {ActivityDependenciesState} from "@core/states/activity-analysis/dependencies/dependencies.state";
import {BrowseActivityAnalysisAction} from "../../../../activity-analysis/states/browse-activity-analysis.action";
import {ActivityImpactMatrixState} from "@core/states/activity-analysis/impact-matrix/impact-matrix.state";
import {ActivityImapctMatrixAction} from "@core/states/activity-analysis/impact-matrix/impact-matrix.action";
import {TranslateObjPipe} from "@shared/sh-pipes/translate-obj.pipe";

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
  page$: Observable<any[]>;
  @ViewChild(Dialog) dialog: Dialog;
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

  public name = '';
  private auditLoadPage$ = new Subject<string>();
  _analysisId: number;
  _cycleID: number;
  _cycle: number;
  get editMode() {
    return this._analysisId !== undefined && this._analysisId !== null;
  }
  get viewOnly() {
    return (
      this.route.snapshot.queryParams['_mode'] === 'viewonly'
    );
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
        filter(cycles => !!cycles),
        take(1)
      )
      .subscribe(cycles => {
        this.selectedCycle = cycles.find(cycle => cycle.id == this._cycle);
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
      .dispatch([new ActivityAnalysisAction.GetActivityAnalysis({id: v}),
        new ActivityAnalysisAction.GetCycle({id: this._cycleID})])
      .pipe(
        takeUntil(this.destroy$),
        take(1),
        tap((v) => {
          const activityID = this.store.selectSnapshot(ActivityAnalysisState.activityAnalysis);
          const cycle = this.store.selectSnapshot(ActivityAnalysisState.cycle);
          this.store.dispatch([
            new ActivityImapctMatrixAction.LoadPage({
              page: 0, size: 10, cycleId: this._cycleID, activityId: activityID?.activity.id}),
            new ImpactMatrixAction.LoadPage({
              page: 0, size: 10, versionId: cycle?.versionId}),
            new ImpactLevelAction.LoadPage({
              page: 0, size: 10, versionId: cycle?.versionId}),
            new RtoAction.LoadPage({
              page: 0, size: 10, versionId: cycle?.versionId}),
            new ActivitySystemsAction.LoadPage({
              page: 0, size: 10, activityId: activityID?.activity.id, cycleId: this._cycleID}),
            new ActivityEmployeesAction.LoadPage({
              page: 0, size: 10, activityId: activityID?.activity.id, cycleId: this._cycleID}),
            new ActivityLocationsAction.LoadPage({
              page: 0, size: 10, activityId: activityID?.activity.id, cycleId: this._cycleID}),
            new ActivityDependenciesAction.LoadDependencyExternal({
              page: 0, size: 10, activityId: activityID?.activity.id, cycleId: this._cycleID}),
            new ActivityDependenciesAction.LoadDependencyInternal({
              page: 0, size: 10, activityId: activityID?.activity.id, cycleId: this._cycleID}),
            new ActivityDependenciesAction.LoadDependencyOrg({
              page: 0, size: 10, activityId: activityID?.activity.id, cycleId: this._cycleID})
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
                    value: rowValue
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
          )

          this.systemPage$ = this.store.select(ActivitySystemsState.page).pipe(
            filter((p) => !!p),
          );
          this.store
            .select(ActivityAnalysisState.activityAnalysis).pipe(
              filter((p) => !!p),
              take(1)
            ).subscribe((data) => {
              this.recoveryPageData = data;
            });
          this.employeePage$ = this.store
            .select(ActivityEmployeesState.page).pipe(
              filter((p) => !!p),
            );
          this.locationPage$ = this.store
            .select(ActivityLocationsState.page).pipe(
              filter((p) => !!p),
            );
          this.venderPage$ = this.store
            .select(ActivityDependenciesState.activityDependencyExternal).pipe(
              filter((p) => !!p),
            );
          this.dependencyInternalPage$ = this.store
            .select(ActivityDependenciesState.activityDependencyInternal).pipe(
              filter((p) => !!p),
            );
          this.orgInternalPage$ = this.store
            .select(ActivityDependenciesState.activityDependencyOrg).pipe(
              filter((p) => !!p),
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
    private translateObj: TranslateObjPipe,
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this._cycle = params['_cycle'];
        this._cycleID = params['_cycleId'];
        this.analysisId = params['_id'];
      });
  }

  ngOnInit(): void {
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'activities' ),
      tap(() => {
        this.selectedActivities = [];
      })
    );


    this.loadPage('', true);
    this.page$ = combineLatest([
      this.store.select(OrgActivityState.idsList),
      this.store.select(OrgActivityState.page),
    ]).pipe(
      map(([ids, activities]) => {
        this.selectedActivities = [];
        let tableRows = activities.map((activity) => {
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
        console.log(this.selectedActivities);
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
  submit() {
    if (!this.selectedActivities || !this.selectedCycle) {
      return;
    }
    let activities: BcActivityAnalysisDto[];
    activities = this.selectedActivities
      .filter((activity) => !activity.selected)
      .map((activity) => {
        return {
          activityId: activity.id,
          cycleId: this.selectedCycle?.id,
        };
      });

    this.store.dispatch(
      new BrowseImpactAnalysisAction.SetCycleActivities(activities)
    );
  }
  loadPage(search?: string, direct = false) {
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
  toggleDialog() {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.ToggleDialog({ dialog: 'activities' })
    );
  }
  close() {
    this.store.dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
  }

  changeSelect(event) {
  }
  selectCycle(event?, cycleId?) {
    if (event) {this.selectedCycle = event?.value}
    this.store.dispatch(
      new OrgActivityAction.loadIdsList({ cycleId: this.selectedCycle?.id ? this.selectedCycle.id : cycleId })
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  setImpactType( test1, test3){}
}
