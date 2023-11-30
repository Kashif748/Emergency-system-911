import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { TreeHelper } from '@core/helpers/tree.helper';
import { OrgDetailAction, OrgDetailState } from '@core/states';
import { VendorsReportState } from '@core/states/bc-reports/vendors-report/vendors-report.state';
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
import { BrowseVendorsReportAction } from '../states/browse-vendors-report.action';
import {
  BrowseVendorsReportState,
  BrowseVendorsReportStateModel,
} from '../states/browse-vendors-report.state';

@Component({
  selector: 'app-browse-vendors-report',
  templateUrl: './browse-vendors-report.component.html',
  styleUrls: ['./browse-vendors-report.component.scss'],
})
export class BrowseVendorsReportComponent implements OnInit {
  public page$: Observable<BcPartnersSummaryResponse[]>;

  @Select(VendorsReportState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(VendorsReportState.loading)
  public loading$: Observable<boolean>;

  @Select(VendorsReportState.exporting)
  public exporting$: Observable<boolean>;

  @Select(BrowseVendorsReportState.state)
  public state$: Observable<BrowseVendorsReportStateModel>;

  // filters
  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();
  public orgHir: TreeNode[] = [];

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  private destroy$ = new Subject();

  public sortableColumns = [
    { name: 'SECTOR', code: 'sectorAr' },
    { name: 'DIVISION', code: 'divisionAr' },
    { name: 'SECTION', code: 'sectionAr' },
    { name: 'VENDOR', code: 'vendorNameAr' },
  ];
  public selectedColumns = [
    { name: 'SECTOR', code: 'sector' },
    { name: 'DIVISION', code: 'division' },
    { name: 'SECTION', code: 'section' },
    { name: 'ACTIVITY', code: 'activity' },
    { name: 'VENDOR', code: 'vendor', disabled: true },
    { name: 'CONTACT_PERSON', code: 'contact' },
    { name: 'SUPPLIES', code: 'supplies' },
    { name: 'PRIMARY_CONTACT', code: 'primary_contact' },
    { name: 'SECONDARY_CONTACT', code: 'secondary_contact' },
    { name: 'CRITICALITY', code: 'criticality' },
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
        this.sortableColumns[3].code = 'vendorNameAr';
      } else {
        this.sortableColumns[0].code = 'sectorAr';
        this.sortableColumns[1].code = 'divisionAr';
        this.sortableColumns[2].code = 'sectionAr';
        this.sortableColumns[3].code = 'vendorNameAr';
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
      .select(VendorsReportState.page)
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
      new BrowseVendorsReportAction.LoadVendorsReport({
        pageRequest: {
          first: event?.first,
          rows: event?.rows,
        },
      })
    );
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseVendorsReportAction.ChangeColumns({ columns: event.value })
    );
  }

  sort(event) {
    this.store.dispatch(
      new BrowseVendorsReportAction.Sort({ field: event.value })
    );
  }
  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseVendorsReportAction.Export({ type }));
  }

  order(event) {
    this.store.dispatch(
      new BrowseVendorsReportAction.Sort({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }

  search() {
    this.store.dispatch(new BrowseVendorsReportAction.LoadVendorsReport());
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);

    this.store.dispatch(new BrowseVendorsReportAction.UpdateFilter(filter));
  }

  clear() {
    this.store.dispatch([
      new BrowseVendorsReportAction.UpdateFilter({ clear: true }),
      new BrowseVendorsReportAction.LoadVendorsReport(),
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
