import { Component, OnInit } from '@angular/core';
import {TranslateService} from "@ngx-translate/core";
import {BrowseGroupsAction} from "../../../_team-mgmt/states/browse-groups.action";
import {Store} from "@ngxs/store";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {LOCATIONS} from "../../tempData.conts";
import {ILangFacade} from "@core/facades/lang.facade";

@Component({
  selector: 'app-browse-location',
  templateUrl: './browse-location.component.html',
  styleUrls: ['./browse-location.component.scss']
})
export class BrowseLocationComponent implements OnInit {
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


  public display = false;

  public page = LOCATIONS;
  public sortableColumns = [
    { name: 'LOCATIONS.DEPARTMENT_NAME', code: 'dept'},
    { name: 'LOCATIONS.LOCATION_NAME', code: 'name' },
    { name: 'LOCATIONS.LOCATION_TYPE', code: 'type' },
    { name: 'LOCATIONS.DISTRICT', code: 'district' }
  ];
  public selectedColumns = [
    { name: 'LOCATIONS.DEPARTMENT_NAME', code: 'dept', disabled: true },
    { name: 'LOCATIONS.LOCATION_NAME', code: 'name'},
    { name: 'LOCATIONS.LOCATION_TYPE', code: 'type'},
    { name: 'LOCATIONS.DISTRICT', code: 'district'}
  ];
  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade,
  ) { }

  ngOnInit(): void {
  }

  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }

  openDialog(groupId?: number) {
    this.display = true;
  }

  export(type: 'EXCEL' | 'PDF') {
    this.store.dispatch(new BrowseGroupsAction.Export({ type }));
  }

  order(event) {
    /*this.store.dispatch(
      new BrowseGroupsAction.SortGroups({ order: event.checked ? 'desc' : 'asc' })
    );*/
  }

  changeView(view: 'TABLE' | 'CARDS') {
    // this.store.dispatch(new BrowseGroupsAction.ChangeView({ view }));
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

  search() {
    // this.store.dispatch(new BrowseGroupsAction.LoadGroups());
  }

  clear() {
    /* this.store.dispatch([
       new BrowseGroupsAction.UpdateFilter({ clear: true }),
       new BrowseGroupsAction.LoadGroups(),
     ]);*/
  }

}
