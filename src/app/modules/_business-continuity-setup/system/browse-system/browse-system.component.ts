import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent, TreeNode } from 'primeng/api';
import { SYSTEMS } from '../../tempData.conts';
import { ILangFacade } from '@core/facades/lang.facade';
import { BrowseSystemsAction } from '../states/browse-systems.action';
import { Observable, Subject } from 'rxjs';
import {
  BrowseSystemsState,
  BrowseSystemsStateModel,
} from '../states/browse-systems.state';
import { auditTime, filter, map, takeUntil, tap } from 'rxjs/operators';
import { MessageHelper } from '@core/helpers/message.helper';
import { BcOrgHierarchyProjection, BcSystems } from 'src/app/api/models';
import { SystemsState } from '@core/states/bc-setup/systems/systems.state';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { PrivilegesService } from '@core/services/privileges.service';
import { OrgDetailAction, OrgDetailState } from '@core/states';
import { TreeHelper } from '@core/helpers/tree.helper';
import { TranslateObjPipe } from '@shared/sh-pipes/translate-obj.pipe';

@Component({
  selector: 'app-browse-system',
  templateUrl: './browse-system.component.html',
  styleUrls: ['./browse-system.component.scss'],
})
export class BrowseSystemComponent implements OnInit, OnDestroy {
  // filters
  public orgHir: TreeNode[] = [];
  @Select(OrgDetailState.loading)
  public loadingOrgHir$: Observable<boolean>;
  private auditLoadOrgPage$ = new Subject<string>();

  public page$: Observable<BcSystems[]>;

  @Select(SystemsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(SystemsState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseSystemsState.state)
  public state$: Observable<BrowseSystemsStateModel>;

  private destroy$ = new Subject();

  public sortableColumns = [
    {
      name: 'SYSTEMS.SYSTEM_NAME',
      code: 'name',
    },
    {
      name: 'SYSTEMS.OWNER_DEPT',
      code: 'orgHierarchy.name',
    },
  ];

  public selectedColumns = [
    { name: 'SYSTEMS.OWNER_DEPT', code: 'dept' },
    { name: 'SYSTEMS.SYSTEM_NAME', code: 'name' },
  ];
  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade,
    private translateObj: TranslateObjPipe,
    private treeHelper: TreeHelper,
    private messageHelper: MessageHelper,
    private breakpointObserver: BreakpointObserver,
    private privilegesService: PrivilegesService,
    private langFacade: ILangFacade
  ) {
    this.langFacade.vm$.pipe().subscribe((res) => {
      if (res.ActiveLang?.key == 'ar') {
        this.sortableColumns[0].code = 'nameAr';
        this.sortableColumns[1].code = 'orgHierarchy.nameAr';
      } else {
        this.sortableColumns[0].code = 'nameEn';
        this.sortableColumns[1].code = 'orgHierarchy.nameEn';
      }
    });
  }

  ngOnInit(): void {
    this.page$ = this.store.select(SystemsState.page).pipe(
      filter((p) => !!p),
      tap(console.log),
      map((page) => [...page].sort((a, b) => a.id - b.id)),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            actions: [
              {
                label: this.translate.instant('ACTIONS.EDIT'),
                icon: 'pi pi-pencil',

                command: () => {
                  this.openDialog(u.id);
                },
                disabled: !this.privilegesService.checkActionPrivileges(
                  'PRIV_ED_BC_RESOURCE'
                ),
              },
              {
                label: this.translate.instant('ACTIONS.DELETE'),
                icon: 'pi pi-trash',
                command: () => {
                  this.activate(u.id);
                },
                disabled: !this.privilegesService.checkActionPrivileges(
                  'PRIV_ED_BC_RESOURCE'
                ),
              },
            ],
          };
        })
      )
    );
    this.breakpointObserver
      .observe([Breakpoints.XSmall, Breakpoints.Small])
      .pipe(
        takeUntil(this.destroy$),
        filter((c) => c.matches)
      )
      .subscribe(() => {
        this.changeView('CARDS');
      });
    this.store.dispatch(
      new OrgDetailAction.GetOrgHierarchySearch({ page: 0, size: 100 })
    );
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openView(systemId?: number) {
    this.store.dispatch(new BrowseSystemsAction.OpenView({ systemId }));
  }

  openDialog(systemId?: number) {
    this.store.dispatch(new BrowseSystemsAction.ToggleDialog({ systemId }));
  }

  activate(id: number) {
    this.messageHelper.confirm({
      summary: 'SHARED.DIALOG.ARE_YOU_SURE',
      detail: 'SHARED.DIALOG.ACTIVATE.MESSAGE',
      yesCommand: () => {
        this.store.dispatch(new BrowseSystemsAction.DeleteSystem({ id }));
        this.messageHelper.closeConfirm();
      },
      noCommand: () => {
        this.messageHelper.closeConfirm();
      },
    });
  }
  search() {
    this.store.dispatch(new BrowseSystemsAction.LoadSystems());
  }

  changeColumns(event) {
    this.store.dispatch(
      new BrowseSystemsAction.ChangeColumns({ columns: event.value })
    );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseSystemsAction.ChangeView({ view }));
  }

  clear() {
    this.store.dispatch([
      new BrowseSystemsAction.UpdateFilter({ clear: true }),
      new BrowseSystemsAction.LoadSystems(),
    ]);
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }

    this.store.dispatch(new BrowseSystemsAction.UpdateFilter(filter));
  }
  sort(event) {
    this.store.dispatch(
      new BrowseSystemsAction.SortSystems({ field: event.value })
    );
  }
  order(event) {
    this.store.dispatch(
      new BrowseSystemsAction.SortSystems({
        order: event.checked ? 'desc' : 'asc',
      })
    );
  }
  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseSystemsAction.LoadSystems({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
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
}
