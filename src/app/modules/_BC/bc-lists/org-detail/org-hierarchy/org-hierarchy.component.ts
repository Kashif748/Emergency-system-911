import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { auditTime, filter, map, take, takeUntil, tap } from 'rxjs/operators';
import { BrowseOrgDetailAction } from '../states/browse-orgDetail.action';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { OrgDetailState } from '@core/states';
import { BcOrgHierarchy } from 'src/app/api/models';
import { IAuthService } from '@core/services/auth.service';
import { OrgStructure } from '@core/entities/AppCommonData';
import {
  BrowseOrgDetailModel,
  BrowseOrgDetailState,
} from '../states/browse-orgDetail.state';
import { TreeHelper } from '@core/helpers/tree.helper';
import { BcOrgHierarchyProjection } from 'src/app/api/models/bc-org-hierarchy-projection';
import { ILangFacade } from '@core/facades/lang.facade';
@Component({
  selector: 'app-org-hierarchy',
  templateUrl: './org-hierarchy.component.html',
  styleUrls: ['./org-hierarchy.component.scss'],
})
export class OrgHierarchyComponent implements OnInit, OnDestroy {
  addAction: TreeNode;
  public orgHir: TreeNode[] = [];

  @Select(OrgDetailState.loading)
  public loading$: Observable<boolean>;

  @Select(OrgDetailState.org)
  public org$: Observable<OrgStructure>;

  public state$: Observable<BrowseOrgDetailModel>;

  private auditLoadPage$ = new Subject<string>();

  private destroy$ = new Subject();
  get loggedinUserId() {
    return this.auth.getClaim('orgId');
  }

  constructor(
    private langFacade: ILangFacade,
    private store: Store,
    private auth: IAuthService,
    private treeHelper: TreeHelper
  ) {
    this.addAction = {
      leaf: true,
      expandedIcon: 'pi pi-plus',
      collapsedIcon: 'pi pi-plus',
      label: 'ORG_HIE.ADD',
      draggable: false,
      droppable: false,
    };
  }

  ngOnInit(): void {
    this.state$ = this.store.select(BrowseOrgDetailState.state).pipe(
      takeUntil(this.destroy$),
      filter((s) => !!s),
      take(1),
      tap(() => {
        this.loadPage(null, true);
        this.store.dispatch([
          new BrowseOrgDetailAction.GetOrgDetail({ id: this.loggedinUserId }),
          new BrowseOrgDetailAction.GetOrgHierarchyTypes({
            page: 0,
            size: 20,
          }),
        ]);
      })
    );
    this.auditLoadPage$
      .pipe(takeUntil(this.destroy$), auditTime(2000))
      .subscribe((search: string) => {
        this.loadPage(search, true);
      });

    this.store
      .select(OrgDetailState.orgHir)
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
        this.orgHir = [{ ...this.addAction }];
      }
      return;
    }

    const branch = this.treeHelper.orgHir2TreeNode(_searchResponses);
    const parentId = _searchResponses[0].parentId;
    const parentNode = this.treeHelper.findOrgHirById(this.orgHir, parentId);
    if (parentNode && parentId) {
      parentNode.children = [...branch, ...parentNode.children];
    } else {
      this.orgHir = [...branch, { ...this.addAction }];
    }
  }
  onDrop(event) {
    let node: BcOrgHierarchy = {
      ...event.dragNode.data,
    };
    if (!event.dragNode?.parent) {
      node.parentId = event.dropNode?.key;
    } else {
      node.parentId = event.dragNode?.parent?.key;
    }
    this.store.dispatch(new BrowseOrgDetailAction.UpdateOrgHierarchy(node));
  }
  selectNode(node: TreeNode) {
    const nodeObj: TreeNode = {
      ...node,
      parent: { key: node.parent?.key || '', label: node.parent?.label },
      children: [],
    };
    this.store.dispatch(new BrowseOrgDetailAction.SelectNode(nodeObj));
  }
  nodeExpand(node: TreeNode) {
    if (node.children.length === 0) {
      node.children.push({ ...this.addAction });
      this.store.dispatch(
        new BrowseOrgDetailAction.GetOrgHierarchy({
          pageRequest: { first: 0, rows: 100 },
          parentId: parseInt(node?.key),
        })
      );
    }
  }

  public loadPage(search?: string, direct = false) {
    console.log(search);

    if (direct) {
      this.orgHir =[];
      this.store.dispatch(
        new BrowseOrgDetailAction.GetOrgHierarchy({
          pageRequest: { first: 0, rows: 100 },
          name: search,
        })
      );
      return;
    }
    this.auditLoadPage$.next(search);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
