import { Component, OnInit } from '@angular/core';
import { ILangFacade } from '@core/facades/lang.facade';
import { IncidentState } from '@core/states';
import { TranslateService } from '@ngx-translate/core';
import { Select, Store } from '@ngxs/store';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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
    this.page$ = this.store.select(IncidentState.page).pipe(
      filter((p) => !!p),
      tap(console.log)
    );
  }

  search() {
    this.store.dispatch(new ReopenAction.LoadIncidentsPage());
  }

  changeView(view: 'TABLE' | 'CARDS') {
    // this.store.dispatch(new ReopenAction.ChangeView({ view }));
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
