import { Component, OnInit } from '@angular/core';
import {ILangFacade} from "@core/facades/lang.facade";
import {LazyLoadEvent, MenuItem} from "primeng/api";
import {TranslateService} from "@ngx-translate/core";
import {SYSTEMS} from "../tempData.conts";

@Component({
  selector: 'app-business-impact-analysis',
  templateUrl: './business-impact-analysis.component.html',
  styleUrls: ['./business-impact-analysis.component.scss']
})
export class BusinessImpactAnalysisComponent implements OnInit {
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
    { name: 'ACTIVITY_NAME', code: 'name' },
    { name: 'ACTIVITY_FEQ', code: 'feq'},
    { name: 'ANALYSIS_CRCLE',  code: 'name'},
    { name: 'RTO', code: 'rto' },
    { name: 'PRIORITY_LEVEL', code: 'priority'},
    { name: 'STATUS', code: 'status'}
  ];

  public selectedColumns = [
    { name: 'ACTIVITY_NAME', code: 'name', disabled: true },
    { name: 'ACTIVITY_FEQ', code: 'feq'},
    { name: 'ANALYSIS_CRCLE', code: 'circle'},
    { name: 'RTO', code: 'rto'},
    { name: 'PRIORITY_LEVEL', code: 'priority'},
    { name: 'STATUS', code: 'status'}
  ];

  public loading = false;
  public display = false;
  public columns: string[] = [ 'criticality', 'rto' , 'desc' ];
  public page = SYSTEMS;
  constructor(
    private lang: ILangFacade,
    private translate: TranslateService,
  ) { }

  ngOnInit(): void {
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

/*  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }*/

  export(type: 'EXCEL' | 'PDF') {
    // this.store.dispatch(new BrowseGroupsAction.Export({ type }));
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
    // this.store.dispatch(new BrowseGroupsAction.ChangeView({ view }));
  }

  clear() {
    /* this.store.dispatch([
       new BrowseGroupsAction.UpdateFilter({ clear: true }),
       new BrowseGroupsAction.LoadGroups(),
     ]);*/
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
