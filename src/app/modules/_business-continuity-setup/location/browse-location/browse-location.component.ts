import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent, MenuItem } from 'primeng/api';
import { LOCATIONS } from '../../tempData.conts';
import { ILangFacade } from '@core/facades/lang.facade';
import { BcLocations } from 'src/app/api/models';
import { Observable, Subject } from 'rxjs';
import { LocationsState } from '@core/states/bc-setup/locations/locations.state';
import {
  BrowseLocationsState,
  BrowseLocationsStateModel,
} from '../states/browse-locations.state';
import { BrowseLocationsAction } from '../states/browse-locations.action';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-browse-location',
  templateUrl: './browse-location.component.html',
  styleUrls: ['./browse-location.component.scss'],
})
export class BrowseLocationComponent implements OnInit, OnDestroy {
  public page$: Observable<BcLocations[]>;

  @Select(LocationsState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(LocationsState.loading)
  public loading$: Observable<boolean>;

  @Select(BrowseLocationsState.state)
  public state$: Observable<BrowseLocationsStateModel>;

  private destroy$ = new Subject();

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

  public sortableColumns = [
    { name: 'LOCATIONS.DEPARTMENT_NAME', code: 'dept' },
    { name: 'LOCATIONS.LOCATION_NAME', code: 'name' },
    { name: 'LOCATIONS.LOCATION_TYPE', code: 'type' },
    { name: 'LOCATIONS.DISTRICT', code: 'district' },
  ];
  public selectedColumns = [
    { name: 'LOCATIONS.DEPARTMENT_NAME', code: 'dept' },
    { name: 'LOCATIONS.LOCATION_NAME', code: 'name' },
    { name: 'LOCATIONS.LOCATION_TYPE', code: 'type' },
    { name: 'LOCATIONS.DISTRICT', code: 'district' },
  ];
  constructor(
    private store: Store,
    private translate: TranslateService,
    private lang: ILangFacade
  ) {}

  ngOnInit(): void {
    this.page$ = this.store.select(LocationsState.page).pipe(
      filter((p) => !!p),
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
                disabled: !u.isActive,
              },
            ],
          };
        })
      )
    );
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  openView(groupId?: number) {
    // this.store.dispatch(new BrowseGroupsAction.OpenView({ id: groupId }));
  }

  openDialog(id?: number) {
    this.store.dispatch(
      new BrowseLocationsAction.ToggleDialog({ locationId: id })
    );
  }
  export(type: 'EXCEL' | 'PDF') {
    // this.store.dispatch(new BrowseLocationsAction.Export({ type }));
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
    this.store.dispatch(
      new BrowseLocationsAction.ChangeColumns({ columns: event.value })
    );
  }

  sort(event) {
    /* this.store.dispatch(
       new BrowseGroupsAction.SortGroups({ field: event.value })
     );*/
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);

    this.store.dispatch(new BrowseLocationsAction.UpdateFilter(filter));
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseLocationsAction.LoadLocations({
        pageRequest: {
          first: event.first,
          rows: event.rows,

        },
      })
    );
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
