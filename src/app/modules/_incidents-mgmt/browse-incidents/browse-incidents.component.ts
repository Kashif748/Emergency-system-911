import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { IncidentState } from '@core/states';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import { IncidentProjection } from 'src/app/api/models';
import { BrowseIncidentsAction } from '../states/browse-incidents.action';
import { BrowseIncidentsState } from '../states/browse-incidents.state';

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

  @Select(BrowseIncidentsState.state)
  public state$: Observable<BrowseIncidentsState>;

  public page$: Observable<IncidentProjection[]>;

  displayedColumns: string[] = [
    'id',
    'serial',
    'description',
    'incidentDate',
    'status',
    'responsibleOrg',
    'center',
  ];
  constructor(private lang: ILangFacade, private store: Store) {}

  ngOnInit(): void {
    this.loadPage({
      rows: 20,
      first: 0,
    });
    this.page$ = this.store.select(IncidentState.incidents).pipe(
      filter((p) => !!p),
      tap(console.log),
      map((page) =>
        page?.map((u) => {
          return {
            ...u,
          };
        })
      )
    );
  }
  openDialog(id?: number) {
    // this.store.dispatch(new BrowseIncidentsAction.ToggleDialog({ taskId: id }));
  }

  search() {
    this.store.dispatch(new BrowseIncidentsAction.LoadPage());
  }

  clear() {
    this.store.dispatch([
      // new BrowseIncidentsAction.UpdateFilter({ clear: true }),
      new BrowseIncidentsAction.LoadPage(),
    ]);
  }
  updateFilter(filter: { [key: string]: any }, event?: KeyboardEvent) {
    if (event?.key === 'Enter') {
      return this.search();
    }
    const keys = Object.keys(filter);
    if (keys.length > 0) {
      switch (keys[0]) {
        case 'orgIds':
          filter['orgIds'] = filter['orgIds']
            .map((o) => {
              return {
                key: o?.key,
                labelEn: o.labelEn,
                labelAr: o.labelAr,
              };
            })
            .filter((id) => ![undefined, null].includes(id));
          break;

        default:
          break;
      }
    }

    // this.store
    //   .dispatch(new BrowseIncidentsAction.UpdateFilter(filter))
    //   .toPromise()
    //   .then(() => {
    //     if (filter.type) {
    //       this.search();
    //     }
    //   });
  }

  changeColumns(event) {
    // this.store.dispatch(
    //   new BrowseIncidentsAction.ChangeColumns({ columns: event.value })
    // );
  }

  changeView(view: 'TABLE' | 'CARDS') {
    // this.store.dispatch(new BrowseIncidentsAction.ChangeView({ view }));
  }

  sort(event) {
    // this.store.dispatch(
    //   new BrowseIncidentsAction.SortTasks({ field: event.value })
    // );
  }
  order(event) {
    // this.store.dispatch(
    //   new BrowseIncidentsAction.SortTasks({ order: event.checked ? 'desc' : 'asc' })
    // );
  }

  public loadPage(event: LazyLoadEvent) {
    this.store.dispatch(
      new BrowseIncidentsAction.LoadPage({
        pageRequest: {
          first: event.first,
          rows: event.rows,
        },
      })
    );
  }
}
