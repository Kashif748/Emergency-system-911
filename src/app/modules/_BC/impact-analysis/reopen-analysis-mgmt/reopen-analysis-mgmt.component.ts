import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {BrowseImpactAnalysisAction} from "../states/browse-impact-analysis.action";
import {Select, Store} from "@ngxs/store";
import {map, switchMap, take, takeUntil, tap} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {Observable, Subject} from "rxjs";
import {TranslateService} from "@ngx-translate/core";
import {OrgDetailAction, RtoAction, RtoState} from "@core/states";
import {ResourceAnalysisState} from "@core/states/impact-analysis/resource-analysis.state";
import {ImpactAnalysisState} from "@core/states/impact-analysis/impact-analysis.state";
import {ImapactAnalysisAction} from "@core/states/impact-analysis/impact-analysis.action";
import {BcAnalysisStatus} from "../../../../api/models";
import {BrowseRtoAction} from "../../bc-lists/rto/states/browse-rto.action";

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

  constructor(
    private store: Store,
    private route: ActivatedRoute,
    private translate: TranslateService,
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
      actionId: action?.id,
      orgHierarchyId: this.orgHierarchyId,
    };
    this.store.dispatch(new BrowseImpactAnalysisAction.UpdateBulkTransaction(Status));
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
