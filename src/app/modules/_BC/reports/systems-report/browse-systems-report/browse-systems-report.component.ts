import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { TreeHelper } from '@core/helpers/tree.helper';
import { OrgDetailAction, OrgDetailState } from '@core/states';
import { SystemsReportState } from '@core/states/bc-reports/systems-report/systems-report.state';
import { ImapactAnalysisAction } from '@core/states/impact-analysis/impact-analysis.action';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil, auditTime, filter, map, tap } from 'rxjs/operators';
import { BcCycles, BcOrgHierarchyProjection } from 'src/app/api/models';
import { BcActivitySystemsSummaryResponse } from 'src/app/api/models/bc-activity-systems-summary-response';
import { BrowseSystemsReportAction } from '../states/browse-systems-report.action';
import {
  BrowseSystemsReportState,
  BrowseSystemsReportStateModel,
} from '../states/browse-systems-report.state';

@Component({
  selector: 'app-browse-systems-report',
  templateUrl: './browse-systems-report.component.html',
  styleUrls: ['./browse-systems-report.component.scss'],
})
export class BrowseSystemsReportComponent implements OnInit {
  public page$: Observable<BcActivitySystemsSummaryResponse[]>;

  @Select(SystemsReportState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(SystemsReportState.loading)
  public loading$: Observable<boolean>;

  @Select(SystemsReportState.exporting)
  public exporting$: Observable<boolean>;

  @Select(BrowseSystemsReportState.state)
  public state$: Observable<BrowseSystemsReportStateModel>;

  // filters
  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();
  public orgHir: TreeNode[] = [];

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  private destroy$ = new Subject();

  public sortableColumns = [
    { name: 'NAME', code: 'systemNameAr' },
    { name: 'CRITICALITY', code: 'isCritical' },
    { name: 'ACTIVITIES', code: 'ba.nameAr' },
    { name: 'DIVISIONS', code: 'divisionNameAr' },
  ];
  public selectedColumns = [
    { name: 'NAME', code: 'name', disabled: true },
    { name: 'CRITICALITY', code: 'criticality' },
    { name: 'ACTIVITIES', code: 'activity' },
    { name: 'DIVISIONS', code: 'division' },
  ];

  exportPdf = () => this.export('PDF');
  exportExcel = () => this.export('EXCEL');

  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade,
    private treeHelper: TreeHelper,
    private translateObj: TranslateObjPipe
  ) {
    this.lang.vm$.pipe().subscribe((res) => {
      if (res.ActiveLang?.key == 'ar') {
        this.sortableColumns[0].code = 'systemNameAr';
        this.sortableColumns[2].code = 'ba.nameAr';
        this.sortableColumns[3].code = 'divisionNameAr';
      } else {
        this.sortableColumns[0].code = 'systemNameEn';
        this.sortableColumns[2].code = 'ba.nameEn';
        this.sortableColumns[3].code = 'divisionNameEn';
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch([
      new ImapactAnalysisAction.LoadCycles({
        page: 0,
        size: 50,
        sort: ['createdOn', 'desc'],
      }),
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),
    ]);
    this.cycles$.pipe(
      filter((cycles) => cycles?.length > 0),
      map((cycles) => cycles[0]),
      tap((cycle) => {
        this.updateFilter({ cycleId: cycle.id });
        this.search();
      })
    ).subscribe();

    this.page$ = this.store
      .select(SystemsReportState.page)
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
        this.orgHir = [];
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
      new BrowseSystemsReportAction.LoadSystemsReport({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseSystemsReportAction.ChangeColumns({ columns: event.value })
    );
  }

  sort(event) {
    this.store.dispatch(
      new BrowseSystemsReportAction.Sort({ field: event.value })
    );
  }
  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseSystemsReportAction.Export({ type }));
  }

  order(event) {
    this.store.dispatch(
      new BrowseSystemsReportAction.Sort({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }

  search() {
    this.store.dispatch(new BrowseSystemsReportAction.LoadSystemsReport());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);

    this.store.dispatch(new BrowseSystemsReportAction.UpdateFilter(filter));
  }

  clear() {
    this.store.dispatch([
      new BrowseSystemsReportAction.UpdateFilter({ clear: true }),
    ]);
    this.cycles$
      .pipe(
        filter((cycles) => cycles?.length > 0),
        map((cycles) => cycles[0]),
        tap((cycle) => {
          this.updateFilter({ cycleId: cycle.id });
        })
      )
      .subscribe();
    this.store.dispatch([
      new BrowseSystemsReportAction.LoadSystemsReport(),
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
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
