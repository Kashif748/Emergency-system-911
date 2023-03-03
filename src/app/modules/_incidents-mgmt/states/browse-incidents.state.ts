import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { IncidentAction } from '@core/states';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { patch, iif } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { BrowseIncidentsAction } from './browse-incidents.action';

export interface BrowseIncidentsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_INCIDENTS_UI_STATE_TOKEN =
  new StateToken<BrowseIncidentsStateModel>('browse_incidents');

@State<BrowseIncidentsStateModel>({
  name: BROWSE_INCIDENTS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {
        status: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 5 }, { id: 6 }],
      },
      first: 0,
      rows: 10,
      sortField: 'dueDate',
      sortOrder: 'desc',
    },
    columns: [
      'id',
      'serial',
      'description',
      'incidentDate',
      'status',
      'responsibleOrg',
      'center',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseIncidentsState {
  /**
   *
   */
  constructor(
    private apiHelper: ApiHelper,
    private messageHelper: MessageHelper,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([BrowseIncidentsState])
  static state(state: BrowseIncidentsStateModel): BrowseIncidentsStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseIncidentsAction.LoadPage)
  loadPage(
    { setState, dispatch, getState }: StateContext<BrowseIncidentsStateModel>,
    { payload }: BrowseIncidentsAction.LoadPage
  ) {
    setState(
      patch<BrowseIncidentsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(
            (_) => !!payload?.pageRequest,
            payload?.pageRequest?.first
          ),
          rows: iif((_) => !!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new IncidentAction.LoadPage({
        first: this.apiHelper.page(pageRequest),
        rows: pageRequest.rows,
        filters: {
          ...pageRequest.filters,
          status: pageRequest.filters.status?.map((o) => o.id),
        },
      })
    );
  }
}
