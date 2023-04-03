import {Component, OnDestroy, OnInit} from '@angular/core';
import {LazyLoadEvent, MenuItem, TreeNode} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {Observable, Subject} from "rxjs";
import {IAuthService} from "@core/services/auth.service";
import {OrgAction, OrgState} from "@core/states";
import {OrgStructure} from "../../../api/models";
import {Select, Store} from "@ngxs/store";
import {BreakpointObserver, Breakpoints} from "@angular/cdk/layout";
import {CenterAction} from "@core/states/service-center-area/centers/center.action";
import {BrowseGroupsState, BrowseGroupsStateModel} from "../../_team-mgmt/states/browse-groups.state";
import {GroupUserAndRolesProjection} from "../../../api/models/group-user-and-roles-projection";
import {TreeHelper} from "@core/helpers/tree.helper";
import {GroupState} from "@core/states/group/group.state";
import {filter, map, takeUntil} from "rxjs/operators";
import {CommonService} from "@core/services/common.service";
import {BrowseGroupsAction} from "../../_team-mgmt/states/browse-groups.action";
import {CenterState} from "@core/states/service-center-area/centers/center.state";
import {ILangFacade} from "@core/facades/lang.facade";
import {Router} from "@angular/router";

@Component({
  selector: 'app-business-continuity-setup',
  templateUrl: './business-continuity-setup.component.html',
  styleUrls: ['./business-continuity-setup.component.scss']
})
export class BusinessContinuitySetupComponent implements OnInit, OnDestroy {

  public exportActions = [
    {
      label: this.translate.instant('ACTIONS.EXPORT_TO_XLSX'),
      icon: 'pi pi-file-excel',
      command: () => this.export('EXCEL'),
    },
    {
      label: this.translate.instant('ACTIONS.EXPORT_TO_PDF'),
      icon: 'pi pi-file-pdf',
      command: () => this.export('PDF'),
    },
  ] as MenuItem[];

  public sortableColumns = [
    {
      name: 'SYSTEMS.DEPARTMENT_NAME',
      code: 'dept',
    },
    {
      name: 'SYSTEMS.SYSTEM_NAME',
      code: 'name',
    },
    { name: 'SYSTEMS.SYSTEM_RTO', code: 'rto' }
  ];

  public columns = [
    { name: 'SYSTEMS.DEPARTMENT_NAME', code: 'dept', disabled: true },
    { name: 'SYSTEMS.SYSTEM_NAME', code: 'name'},
    { name: 'SYSTEMS.SYSTEM_RTO', code: 'rto'}
  ];


  constructor(
    private store: Store,
    private breakpointObserver: BreakpointObserver,
    private translate: TranslateService,
    private lang: ILangFacade,
    private router: Router
    ) {
  }


  ngOnDestroy(): void {
  }

  ngOnInit(): void {

    const groupActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
    ] as MenuItem[];
  }


  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseGroupsAction.Export({ type }));
  }

  openDialog(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.ToggleDialog({ id: groupId }));
  }
  search() {
    // this.store.dispatch(new BrowseGroupsAction.LoadGroups());
  }

  changeColumns(event) {
   /* this.store.dispatch(
      new BrowseGroupsAction.ChangeColumns({ columns: event.value })
    );*/
  }

  sort(event) {
   /* this.store.dispatch(
      new BrowseGroupsAction.SortGroups({ field: event.value })
    );*/
  }

  order(event) {
    /*this.store.dispatch(
      new BrowseGroupsAction.SortGroups({ order: event.checked ? 'desc' : 'asc' })
    );*/
  }

  changeView(view: 'TABLE' | 'CARDS') {
    this.store.dispatch(new BrowseGroupsAction.ChangeView({ view }));
  }

  clear() {
   /* this.store.dispatch([
      new BrowseGroupsAction.UpdateFilter({ clear: true }),
      new BrowseGroupsAction.LoadGroups(),
    ]);*/
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
  /*  if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
        case 'orgId':
          filter['orgId'] = {
            key: filter['orgId']?.key,
            labelEn: filter['orgId'].labelEn,
            labelAr: filter['orgId'].labelAr,
          };
          break;
        default:
          break;
      }
    }
    this.store.dispatch(new BrowseGroupsAction.UpdateFilter(filter));*/
  }

  public loadPage(event: LazyLoadEvent) {
 /*   this.store.dispatch(
      new BrowseGroupsAction.LoadGroups({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );*/
  }

  public navigateTo(where: any) {
    if (where === 'system') {
      this.router.navigate(['systems']);
    } else if (where === 'location') {
      this.router.navigate(['locations']);
    } else {
      this.router.navigate(['venders']);
    }
  }

}
