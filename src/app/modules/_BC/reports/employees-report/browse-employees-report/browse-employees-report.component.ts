import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { TreeHelper } from '@core/helpers/tree.helper';
import { OrgDetailAction, OrgDetailState } from '@core/states';
import { EmployeesReportState } from '@core/states/bc-reports/employees-report/employees-report.state';
import { ImapactAnalysisAction } from '@core/states/impact-analysis/impact-analysis.action';
import { ImpactAnalysisState } from '@core/states/impact-analysis/impact-analysis.state';
import { Select, Store } from '@ngxs/store';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { takeUntil, auditTime, filter, map, tap } from 'rxjs/operators';
import {
  BcCycles,
  BcOrgHierarchyProjection,
  BcPartnersSummaryResponse,
} from 'src/app/api/models';
import { BrowseEmployeesReportAction } from '../states/browse-employees-report.action';
import {
  BrowseEmployeesReportState,
  BrowseEmployeesReportStateModel,
} from '../states/browse-employees-report.state';

@Component({
  selector: 'app-browse-employees-report',
  templateUrl: './browse-employees-report.component.html',
  styleUrls: ['./browse-employees-report.component.scss'],
})
export class BrowseEmployeesReportComponent implements OnInit {
  public page$: Observable<BcPartnersSummaryResponse[]>;

  @Select(EmployeesReportState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(EmployeesReportState.loading)
  public loading$: Observable<boolean>;

  @Select(EmployeesReportState.exporting)
  public exporting$: Observable<boolean>;

  @Select(BrowseEmployeesReportState.state)
  public state$: Observable<BrowseEmployeesReportStateModel>;

  // filters
  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();
  public orgHir: TreeNode[] = [];

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  private destroy$ = new Subject();

  public sortableColumns = [
    { name: 'SUMMARY.SECTOR', code: 'sectorAr' },
    { name: 'SUMMARY.DIVISION', code: 'divisionAr' },
    { name: 'SUMMARY.SECTION', code: 'sectionAr' },
    { name: 'EMPLOYEES.NAME', code: 'nameAr' },
  ];
  public selectedColumns = [
    { name: 'SUMMARY.SECTOR', code: 'sector' },
    { name: 'SUMMARY.DIVISION', code: 'division' },
    { name: 'SUMMARY.SECTION', code: 'section' },
    { name: 'ACTIVITY', code: 'activity' },
    { name: 'EMPLOYEES.NAME', code: 'name', disabled: true },
    { name: 'EMPLOYEES.TYPE', code: 'type' },
    { name: 'EMPLOYEES.LANDLINE', code: 'landline' },
    { name: 'EMPLOYEES.MOBILE', code: 'mobile' },
    { name: 'EMPLOYEES.OTHER_PHONE', code: 'alternative' },
    { name: 'EMPLOYEES.EMAIL', code: 'email' },
    { name: 'SUMMARY.CRITICALITY', code: 'criticality' },
  ];

  exportPdf = () => this.export('PDF');
  exportExcel = () => this.export('EXCEL');

  constructor(
    private store: Store,
    private lang: ILangFacade,
    private treeHelper: TreeHelper,
    private translateObj: TranslateObjPipe
  ) {
    this.lang.vm$.pipe().subscribe((res) => {
      if (res.ActiveLang?.key == 'ar') {
        this.sortableColumns[0].code = 'sectorAr';
        this.sortableColumns[1].code = 'divisionAr';
        this.sortableColumns[2].code = 'sectionAr';
        this.sortableColumns[3].code = 'employee.nameAr';
      } else {
        this.sortableColumns[0].code = 'sectorAr';
        this.sortableColumns[1].code = 'divisionAr';
        this.sortableColumns[2].code = 'sectionAr';
        this.sortableColumns[3].code = 'employee.nameEn';
      }
    });
  }

  ngOnInit(): void {
    this.state$
      .pipe(
        tap((state) => {
          console.log(state);
        })
      )
      .subscribe();
    this.store.dispatch([
      new ImapactAnalysisAction.LoadCycles({
        page: 0,
        size: 50,
        sort: ['createdOn', 'desc'],
      }),
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 }),
    ]);
    this.cycles$
      .pipe(
        filter((cycles) => cycles?.length > 0),
        map((cycles) => cycles[0]),
        tap((cycle) => {
          this.updateFilter({ cycleId: cycle.id });
          this.search();
        })
      )
      .subscribe();

    this.page$ = this.store
      .select(EmployeesReportState.page)
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
      new BrowseEmployeesReportAction.LoadEmployeesReport({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseEmployeesReportAction.ChangeColumns({ columns: event.value })
    );
  }

  sort(event) {
    this.store.dispatch(
      new BrowseEmployeesReportAction.Sort({ field: event.value })
    );
  }
  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseEmployeesReportAction.Export({ type }));
  }

  order(event) {
    this.store.dispatch(
      new BrowseEmployeesReportAction.Sort({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }

  search() {
    this.store.dispatch(new BrowseEmployeesReportAction.LoadEmployeesReport());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);

    this.store.dispatch(new BrowseEmployeesReportAction.UpdateFilter(filter));
  }

  clear() {
    this.store.dispatch([
      new BrowseEmployeesReportAction.UpdateFilter({ clear: true }),
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
      new BrowseEmployeesReportAction.LoadEmployeesReport(),
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
