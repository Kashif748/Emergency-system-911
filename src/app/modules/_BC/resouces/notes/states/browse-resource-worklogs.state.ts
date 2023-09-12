import { PageRequestModel } from '@core/models/page-request.model';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
  Store,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageHelper } from '@core/helpers/message.helper';
import { iif, patch } from '@ngxs/store/operators';
import { ApiHelper } from '@core/helpers/api.helper';
import { catchError, finalize, tap } from 'rxjs/operators';
import { EMPTY } from 'rxjs';
import { ActivityWorklogsAction } from '@core/states/activity-analysis/worklogs/worklogs.action';
import {BrowseResourceWorklogsAction} from "./browse-resource-worklogs.action";
import {ResourceWorklogsAction} from "@core/states/bc-resources/worklogs/resourceWorklogs.action";

export interface BrowseResourceWorklogsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_ACTIVITY_WORKLOGS_UI_STATE_TOKEN =
  new StateToken<BrowseResourceWorklogsStateModel>('browse_resource_worklogs');

@State<BrowseResourceWorklogsStateModel>({
  name: BROWSE_ACTIVITY_WORKLOGS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: ['criticality', 'rtoEn', 'description'],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseResourceWorklogsState {
  /**
   *
   */
  constructor(
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute,
    private store: Store,
    private messageHelper: MessageHelper
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseResourceWorklogsState])
  static state(
    state: BrowseResourceWorklogsStateModel
  ): BrowseResourceWorklogsStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */

  @Action(BrowseResourceWorklogsAction.LoadResourceWorklogs)
  LoadActivityWorklogs(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseResourceWorklogsStateModel>,
    { payload }: BrowseResourceWorklogsAction.LoadResourceWorklogs
  ) {
    setState(
      patch<BrowseResourceWorklogsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;

    return dispatch(
      new ResourceWorklogsAction.LoadPage({
        actionTypeId: payload?.actionTypeId,
        resourceId: payload.resourceId,
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        // filters: this.filters(pageRequest),
      })
    );
  }

  @Action(BrowseResourceWorklogsAction.LoadResourceWorklogs)
  LoadActivityWorklogsTypes({
                              dispatch,
                            }: StateContext<BrowseResourceWorklogsStateModel>) {
    return dispatch(new ResourceWorklogsAction.LoadWorklogsTypes());
  }

  @Action(BrowseResourceWorklogsAction.Create)
  Create(
    { dispatch, getState }: StateContext<BrowseResourceWorklogsStateModel>,
    { payload }: BrowseResourceWorklogsAction.Create
  ) {
    return dispatch(new ResourceWorklogsAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(
          new BrowseResourceWorklogsAction.LoadResourceWorklogs({
            actionTypeId: payload.actionType.id,
            resourceId: payload.resource?.id,
          })
        );
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseResourceWorklogsAction.Update)
  Update(
    { dispatch }: StateContext<BrowseResourceWorklogsStateModel>,
    { payload }: BrowseResourceWorklogsAction.Update
  ) {
    return dispatch(new ResourceWorklogsAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(
          new BrowseResourceWorklogsAction.LoadResourceWorklogs({
            actionTypeId: payload.actionType.id,
            resourceId: payload.resource?.id,
          })
        );
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
}
