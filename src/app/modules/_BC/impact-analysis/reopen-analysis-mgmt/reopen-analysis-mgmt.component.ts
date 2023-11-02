import {Component, OnDestroy, OnInit} from '@angular/core';
import {BrowseImpactAnalysisAction} from "../states/browse-impact-analysis.action";
import {Select, Store} from "@ngxs/store";
import {filter, map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {ImpactAnalysisState} from "@core/states/impact-analysis/impact-analysis.state";
import {ImapactAnalysisAction} from "@core/states/impact-analysis/impact-analysis.action";
import {BcAnalysisStatus} from "../../../../api/models";
import {ILangFacade} from "@core/facades/lang.facade";
import {PrivilegesService} from "@core/services/privileges.service";

@Component({
  selector: 'app-reopen-analysis-mgmt',
  templateUrl: './reopen-analysis-mgmt.component.html',
  styleUrls: ['./reopen-analysis-mgmt.component.scss']
})
export class ReopenAnalysisMgmtComponent implements OnInit, OnDestroy {
  opened$: Observable<boolean>;

  @Select(ImpactAnalysisState.isBCAnalysisStatusSimiliar)
  public shouldDisable$: Observable<boolean>;

  @Select(ImpactAnalysisState.statusbasedOnId)
  public statusbasedOnId$: Observable<BcAnalysisStatus>;

  @Select(ImpactAnalysisState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ResourceAnalysisState.totalRecords)
  public resourceTotalRecords$: Observable<number>;

  @Select(ImpactAnalysisState.blocking)
  public blocking$: Observable<boolean>;

  private destroy$ = new Subject();

  orgHierarchyId: number;
  cycleId: number;

  public icon$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) =>
      key === 'ar' ? 'pi pi-arrow-right' : 'pi pi-arrow-left'
    )
  );

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private translate: TranslateService,
    private router: Router,
    private lang: ILangFacade,
    private privilegesService: PrivilegesService,
  ) {
    this.route.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe((params) => {
        this.orgHierarchyId = params['_division'];
        this.cycleId = params['_cycle'];
      });
  }

  ngOnInit(): void {
    this.store.dispatch(new BrowseImpactAnalysisAction.LoadAnalysisStatusInfo(
      { orgHierarchyId: this.orgHierarchyId, cycleId: this.cycleId }))
      .pipe(
        switchMap(() => this.store.select(ImpactAnalysisState.loadAnalysisStatus)),
        takeUntil(this.destroy$),
        take(1),
        filter((p) => !!p),
        tap((status) => {
          this.store.dispatch(new ImapactAnalysisAction.LoadStatusBasedOnStatusId(
            { id:  status.id}));
        })
      ).subscribe();
    this.opened$ = this.route.queryParams.pipe(
      map((params) => params['_dialog'] === 'send')
    );
  }

  toggleDialog() {
    this.store.dispatch(
      new BrowseImpactAnalysisAction.ToggleDialog({ dialog: 'send' })
    );
  }

  close() {
    this.store.dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
  }

  bulkUpdate(action) {
    const Status = {
      cycleId: this.cycleId,
      actionId: action?.actionId,
      orgHierarchyId: this.orgHierarchyId,
    };
    this.store.dispatch(new BrowseImpactAnalysisAction.UpdateBulkTransaction(Status));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  back() {
    this.router.navigate(['/bc/bia-apps'], { queryParams: {
        _activity: undefined,
        _division: undefined
      },
      queryParamsHandling: "merge" });
  }
  checkPermissoon(action) {
    const privilige = this.privilegesService.checkActionPrivilege('PRIV_APPROVE_ACTIVITY_ANALYSIS');
    if (action.id === 5) {
      if (privilige) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
}
