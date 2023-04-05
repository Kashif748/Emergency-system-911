import { Component, OnInit } from '@angular/core';
import {VENDERS} from "../../tempData.conts";
import {Store} from "@ngxs/store";
import {BrowseGroupsAction} from "../../../_team-mgmt/states/browse-groups.action";

@Component({
  selector: 'app-venders-partners-content',
  templateUrl: './venders-partners-content.component.html',
  styleUrls: ['./venders-partners-content.component.scss']
})
export class VendersPartnersContentComponent implements OnInit {

  public loading = false;
  public display = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = VENDERS;
  public sortableColumns = [
    { name: 'VENDERS.DEPARTMENT_NAME', code: 'dept'},
    { name: 'VENDERS.COMPANY_NAME', code: 'name' },
    { name: 'VENDERS.TYPE', code: 'type' },
    { name: 'VENDERS.SERVICES', code: 'service' }
  ];
  public selectedColumns = [
    { name: 'VENDERS.DEPARTMENT_NAME', code: 'dept', disabled: true },
    { name: 'VENDERS.COMPANY_NAME', code: 'name'},
    { name: 'VENDERS.TYPE', code: 'type'},
    { name: 'VENDERS.SERVICES', code: 'service'}
  ];
  constructor(
    private store: Store,
  ) { }

  ngOnInit(): void {
  }

  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }

  openDialog(groupId?: number) {
    this.display = true;
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
}
