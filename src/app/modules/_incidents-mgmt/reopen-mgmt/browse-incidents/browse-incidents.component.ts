import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { CommonDataState, IncidentState } from '@core/states';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { IncidentProjection } from 'src/app/api/models';
import { ReopenAction } from '../../states/reopen.action';
import { ReopenState } from '../../states/reopen.state';

@Component({
  selector: 'app-browse-incidents',
  templateUrl: './browse-incidents.component.html',
  styleUrls: ['./browse-incidents.component.scss'],
})
export class BrowseIncidentsComponent implements OnInit {
  @Select(IncidentState.loading)
  public loading$: Observable<boolean>;

  @Select(IncidentState.totalRecords)
  public totalRecords$: Observable<number>;

  @Select(ReopenState.state)
  public state$: Observable<ReopenState>;

  @Select(ReopenState.hasIncidentFilters)
  public hasFilters$: Observable<boolean>;

  @Select(CommonDataState.incidentCategories)
  public categories$: Observable<any[]>;

  @Select(CommonDataState.incidentStatus)
  public statuses$: Observable<any[]>;

  public page$: Observable<IncidentProjection[]>;

  public sortableColumns$ = this.lang.vm$.pipe(
    map(({ ActiveLang: { key } }) => {
      return [
        { name: 'INCIDENTS.SERIAL', code: 'serial' },
        { name: 'INCIDENTS.MAIN_CATEGORY', code: 'category' },
        { name: 'INCIDENTS.CREATION_DATE', code: 'incidentDate' },
        { name: 'INCIDENTS.RESPONSIBLE_ORG', code: 'responsibleOrg' },
        {
          name: 'INCIDENTS.SPECIALIZED_CENTER',
          code: `incidentOrgs`,
        },
        { name: 'INCIDENTS.STATUS', code: 'status' },
      ];
    })
  );

  public columns = [
    { name: 'INCIDENTS.SERIAL', code: 'serial' },
    { name: 'INCIDENTS.MAIN_CATEGORY', code: 'category' },
    { name: 'INCIDENTS.CREATION_DATE', code: 'incidentDate' },
    { name: 'INCIDENTS.RESPONSIBLE_ORG', code: 'responsibleOrg' },
    {
      name: 'INCIDENTS.SPECIALIZED_CENTER',
      code: `incidentOrgs`,
    },
    { name: 'INCIDENTS.STATUS', code: 'status' },
  ];
  constructor(private lang: ILangFacade, private store: Store) {}

  ngOnInit(): void {
    this.page$ = this.store.select(IncidentState.page).pipe(
      filter((p) => !!p),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
            Porg: u['incidentOrgs']?.find(
              (element) => element.isMain && element.isMain == true
            ),
          };
        })
      )
    );
  }

  search() {
    this.store.dispatch(new ReopenAction.LoadIncidentsPage());
  }

  changeView(view: 'TABLE' | 'CARDS') {
    // this.store.dispatch(new ReopenAction.ChangeView({ view }));
  }
  changeColumns(event) {
    this.store.dispatch(
      new ReopenAction.ChangeColumns({ columns: event.value })
    );
  }

  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }

    this.store
      .dispatch(new ReopenAction.UpdateIncidentFilter(filter))
      .toPromise()
      .then(() => {
        if (filter.type) {
          this.search();
        }
      });
  }

  clear() {
    this.store.dispatch([
      new ReopenAction.UpdateIncidentFilter({ clear: true }),
      new ReopenAction.LoadIncidentsPage(),
    ]);
  }
  sort(event) {
    this.store.dispatch(new ReopenAction.SortIncidint({ field: event.value }));
  }
  order(event) {
    this.store.dispatch(
      new ReopenAction.SortIncidint({ order: event.checked ? 'desc' : 'asc' })
    );
  }
  reOpenIncidint(id: number) {
    this.store
      .dispatch(new ReopenAction.reOpenIncidint({ incidentId: id }))
      .toPromise()
      .then(() => {
        this.search();
      });
  }
  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new ReopenAction.LoadIncidentsPage({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
