import { Component, OnDestroy, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { filter, map, takeUntil, tap } from 'rxjs/operators';
import { BrowseOrgDetailAction } from '../states/browse-orgDetail.action';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { OrgDetailState } from '@core/states';
import { BcOrgHierarchy } from 'src/app/api/models';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';
import { TranslateService } from '@ngx-translate/core';
import { IAuthService } from '@core/services/auth.service';
import { OrgStructure } from '@core/entities/AppCommonData';
import {
  BrowseOrgDetailModel,
  BrowseOrgDetailState,
} from '../states/browse-orgDetail.state';
@Component({
  selector: 'app-org-hierarchy',
  templateUrl: './org-hierarchy.component.html',
  styleUrls: ['./org-hierarchy.component.scss'],
})
export class OrgHierarchyComponent implements OnInit, OnDestroy {
  public orgHir$: Observable<TreeNode[]>;

  @Select(OrgDetailState.loading)
  public loading$: Observable<boolean>;

  @Select(OrgDetailState.org)
  public org$: Observable<OrgStructure>;

  @Select(BrowseOrgDetailState.state)
  public state$: Observable<BrowseOrgDetailModel>;

  private destroy$ = new Subject();
  get loggedinUserId() {
    return this.auth.getClaim('orgId');
  }

  constructor(
    private store: Store,
    private translateObj: TranslateObjPipe,
    private translateService: TranslateService,
    private auth: IAuthService
  ) {}

  ngOnInit(): void {
    this.store.dispatch([
      new BrowseOrgDetailAction.GetOrgHierarchy(),
      new BrowseOrgDetailAction.GetOrgDetail({ id: this.loggedinUserId }),
      new BrowseOrgDetailAction.GetOrgHierarchyTypes({
        page: 0,
        size: 20,
      }),
    ]);
    this.orgHir$ = this.store.select(OrgDetailState.orgHir).pipe(
      takeUntil(this.destroy$),
      filter((p) => !!p),
      map((data) => this.setTree(data))
    );
  }

  public setTree(_searchResponses: BcOrgHierarchy[]): TreeNode[] {
    let leafObj: TreeNode = {
      leaf: true,
      expandedIcon: 'pi pi-plus',
      collapsedIcon: 'pi pi-plus',
      label: this.translateService.instant('ORG_HIE.ADD'),
      draggable: false,
      droppable: false,
    };
    const nest = (items, id = null, link = 'parentId') =>
      items
        .filter((item) => item[link] === id)
        .map((item: BcOrgHierarchy) => {
          let node: TreeNode;
          node = {
            key: item.id.toString(),
            data: item,
            label: this.translateObj.transform(item),
            leaf: false,
            draggable: true,
            droppable: true,
            children: [...nest(items, item.id), { ...leafObj }],
          };
          return node;
        });
    return [...nest(_searchResponses), leafObj];
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
