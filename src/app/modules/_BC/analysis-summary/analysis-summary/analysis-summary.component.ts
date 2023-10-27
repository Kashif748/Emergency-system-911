import { Component, OnDestroy, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { TreeHelper } from '@core/helpers/tree.helper';
import { OrgDetailAction, OrgDetailState } from '@core/states';
import { AnalysisSummaryState } from '@core/states/activity-analysis/analysis-summary/analysis-summary.state';
import { ImapactAnalysisAction } from '@core/states/impact-analysis/impact-analysis.action';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { auditTime, filter, map, takeUntil } from 'rxjs/operators';
import { BcCycles, BcOrgHierarchyProjection } from 'src/app/api/models';
import { BcActivityAnalysisSummaryResponse } from 'src/app/api/models/bc-activity-analysis-summary-response';
import { BrowseAnalysisSummaryAction } from '../states/browse-summary.action';
import {
  BrowseAnalysisSummaryState,
  BrowseAnalysisSummaryStateModel,
} from '../states/browse-summary.state';

@Component({
  selector: 'app-analysis-summary',
  templateUrl: './analysis-summary.component.html',
  styleUrls: ['./analysis-summary.component.scss'],
})
export class AnalysisSummaryComponent implements OnInit, OnDestroy {
  public page$: Observable<BcActivityAnalysisSummaryResponse[]>;

  @Select(AnalysisSummaryState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(AnalysisSummaryState.loading)
  public loading$: Observable<boolean>;

  @Select(AnalysisSummaryState.exporting)
  public exporting$: Observable<boolean>;

  @Select(BrowseAnalysisSummaryState.state)
  public state$: Observable<BrowseAnalysisSummaryStateModel>;

  // filters
  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();
  public orgHir: TreeNode[] = [];

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  private destroy$ = new Subject();

  public sortableColumns = [
    { name: 'SECTOR', code: 'sector' },
    { name: 'DIVISION', code: 'division' },
    { name: 'SECTION', code: 'section' },
  ];
  public selectedColumns = [
    { name: 'ACTIVITY', code: 'activity', disabled: true },
    { name: 'SECTOR', code: 'sector' },
    { name: 'DIVISION', code: 'division' },
    { name: 'SECTION', code: 'section' },
    { name: 'CRITICALITY', code: 'criticality' },
    { name: 'RTO', code: 'rto' },
    { name: 'CAPACITY', code: 'capacity' },
    { name: 'RECOVERYPRIORITYSEQUENCE', code: 'recoveryPrioritySequence' },
  ];

  exportPdf = () => this.export('PDF');
  exportExcel = () => this.export('EXCEL');

  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade,
    private treeHelper: TreeHelper,
    private translateObj: TranslateObjPipe
  ) {}

  ngOnInit(): void {
    this.store.dispatch([
      new ImapactAnalysisAction.LoadCycles({
        page: 0,
        size: 50,
      }),
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),
    ]);
    this.loadPage();

    this.page$ = this.store
      .select(AnalysisSummaryState.page)
      .pipe(filter((p) => !!p));

    this.store
      .select(OrgDetailState.orgHirSearch)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        map((data) => this.setTree(data))
      )
      .subscribe();

    this.auditLoadOrgPage$
      .pipe(takeUntil(this.destroy$), auditTime(2000))
      .subscribe((search: string) => {
        this.store.dispatch(
          new OrgDetailAction.GetOrgHierarchySearch({
            page: 0,
            size: 100,
            name: search,
          })
        );
      });
  }

  public loadPage(event?: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseAnalysisSummaryAction.LoadAnalysisSummary({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseAnalysisSummaryAction.ChangeColumns({ columns: event.value })
    );
  }

  sort(event) {
    this.store.dispatch(
      new BrowseAnalysisSummaryAction.SortActivities({ field: event.value })
    );
  }
  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseAnalysisSummaryAction.Export({ type }));
  }

  order(event) {
    this.store.dispatch(
      new BrowseAnalysisSummaryAction.SortActivities({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }

  search() {
    this.store.dispatch(new BrowseAnalysisSummaryAction.LoadAnalysisSummary());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);

    this.store.dispatch(new BrowseAnalysisSummaryAction.UpdateFilter(filter));
  }

  clear() {
    this.store.dispatch([
      new BrowseAnalysisSummaryAction.UpdateFilter({ clear: true }),
      new BrowseAnalysisSummaryAction.LoadAnalysisSummary(),
    ]);
  }

  public setTree(_searchResponses: BcOrgHierarchyProjection[]) {
    if (_searchResponses.length == 0) {
      if (this.orgHir.length == 0) {
        this.orgHir = [];
      }
      return;
    }
    let branch = this.treeHelper.orgHir2TreeNode(_searchResponses);
    if (branch?.length > 0) {
      branch.forEach(
        (item) => (item.label = this.translateObj.transform(item.data))
      );
    }

    const parentId = _searchResponses[0].parentId;
    const parentNode = this.treeHelper.findOrgHirById(this.orgHir, parentId);
    // console.log(parentId ,parentNode);

    if (parentNode && parentId) {
      parentNode.children = [...branch, ...parentNode.children];
    } else {
      this.orgHir = branch;
    }
  }
  filterOrgHir(event) {
    this.auditLoadOrgPage$.next(event.filter);
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
