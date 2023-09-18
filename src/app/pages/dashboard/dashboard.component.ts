import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { DashboardService } from './dashboard.service';
import { data } from './random-data';
import { DateAdapter } from '@angular/material/core';
import { TranslationService } from 'src/app/modules/i18n/translation.service';
import {BcCycles} from "../../api/models";
import {Observable, Subject} from "rxjs";
import {Select, Store} from "@ngxs/store";
import {ImpactAnalysisState} from "@core/states/impact-analysis/impact-analysis.state";
import {BrowseImpactAnalysisAction} from "../../modules/_BC/impact-analysis/states/browse-impact-analysis.action";
import {OrgDetailAction, OrgDetailState} from "@core/states";
import {ImapactAnalysisAction} from "@core/states/impact-analysis/impact-analysis.action";
import {TreeNode} from "primeng/api";
import {filter, map, takeUntil} from "rxjs/operators";
import {BcOrgHierarchyProjection} from "../../api/models/bc-org-hierarchy-projection";
import {TreeHelper} from "@core/helpers/tree.helper";
import {TranslateObjPipe} from "@shared/sh-pipes/translate-obj.pipe";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  // UI
  @ViewChild(MatCalendar) dateMatCalendar: MatCalendar<Date>;
  widgets = data;
  inProgressIncidnts = [];
  // Variables

  statistics: any;
  stompClient: any;
  lang: string;

  @Select(ImpactAnalysisState.cycles)
  public cycles$: Observable<BcCycles[]>;

  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();
  private destroy$ = new Subject();
  public orgHir: TreeNode[] = [];
  constructor(
    private dashboardService: DashboardService,
    private dateAdapter: DateAdapter<any>,
    private translationService: TranslationService,
    private store: Store,
    private treeHelper: TreeHelper,
    private translateObj: TranslateObjPipe,
  ) {
    this.lang = this.translationService.getSelectedLanguage();
  }

  ngOnInit(): void {
    this.dashboardService.getStatistic();
    this.dashboardService.getIds();
    this.dashboardService.getInProgressIncidnts().subscribe((data) => {
      this.inProgressIncidnts = data;
    });

    if (this.lang == 'ar') {
      this.dateAdapter.setLocale('ar');
    } else {
      this.dateAdapter.setLocale('en');
    }
    this.store.dispatch([
      new ImapactAnalysisAction.LoadCycles({ page: 0, size: 100 }),
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 })]);

    this.store
      .select(OrgDetailState.orgHirSearch)
      .pipe(
        takeUntil(this.destroy$),
        filter((p) => !!p),
        map((data) => this.setTree(data))
      )
      .subscribe();
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
  @HostListener('document:visibilitychange', ['$event'])
  visibilityChange($event: Event) {
    if (document.visibilityState === 'visible') {
      this.dashboardService.getStatistic();
      this.dashboardService.getIds();
    }
  }
}
