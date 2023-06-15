import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BrowseGroupsAction} from "../../../_team-mgmt/states/browse-groups.action";
import {Store} from "@ngxs/store";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {SYSTEMS} from "../../tempData.conts";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-browse-system',
  templateUrl: './browse-system.component.html',
  styleUrls: ['./browse-system.component.scss']
})
export class BrowseSystemComponent implements OnInit {
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

  public selectedColumns = [
    { name: 'SYSTEMS.DEPARTMENT_NAME', code: 'dept', disabled: true },
    { name: 'SYSTEMS.SYSTEM_NAME', code: 'name'},
    { name: 'SYSTEMS.SYSTEM_RTO', code: 'rto'}
  ];

  public loading = false;
  public display = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = SYSTEMS;
  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
    const groupActions = [
      {
        label: this.translate.instant('ACTIONS.EDIT'),
        icon: 'pi pi-pencil',
      },
    ] as MenuItem[];
  }

  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
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
}
