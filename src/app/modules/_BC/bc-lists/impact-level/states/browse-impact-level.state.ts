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
import { MessageHelper } from '@core/helpers/message.helper';
import { ApiHelper } from '@core/helpers/api.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { iif, patch } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BrowseImpactLevelAction } from './browse-impact-level.action';
import { ImpactLevelAction } from '@core/states';

export interface BrowseImpactLevelStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_IMPACT_LEVEL_UI_STATE_TOKEN =
  new StateToken<BrowseImpactLevelStateModel>('browse_bc_impact_level');

@State<BrowseImpactLevelStateModel>({
  name: BROWSE_IMPACT_LEVEL_UI_STATE_TOKEN,
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
export class BrowseImpactLevelState {
  /**
   *
   */
  constructor(
    private messageHelper: MessageHelper,
    private router: Router,
    private apiHelper: ApiHelper,
    private route: ActivatedRoute,
    private store: Store
  ) {}

  /* ************************ SELECTORS ******************** */
  @Selector([BrowseImpactLevelState])
  static state(
    state: BrowseImpactLevelStateModel
  ): BrowseImpactLevelStateModel {
    return state;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseImpactLevelAction.LoadImpactLevel)
  loadImpactLevel(
    { setState, dispatch, getState }: StateContext<BrowseImpactLevelStateModel>,
    { payload }: BrowseImpactLevelAction.LoadImpactLevel
  ) {
    setState(
      patch<BrowseImpactLevelStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImpactLevelAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        versionId: payload?.versionId,
        isActive: true

      })
    );
  }

  @Action(BrowseImpactLevelAction.CreateImpactLevel)
  createImpactLevel(
    { dispatch }: StateContext<BrowseImpactLevelStateModel>,
    { payload }: BrowseImpactLevelAction.CreateImpactLevel
  ) {
    return dispatch(new ImpactLevelAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([new BrowseImpactLevelAction.LoadImpactLevel()]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseImpactLevelAction.UpdateImpactLevel)
  updateImpactLevel(
    { dispatch }: StateContext<BrowseImpactLevelStateModel>,
    { payload }: BrowseImpactLevelAction.UpdateImpactLevel
  ) {
    return dispatch(new ImpactLevelAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([new BrowseImpactLevelAction.LoadImpactLevel({
          versionId: payload.versionId
        })]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseImpactLevelAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseImpactLevelStateModel>,
    { payload }: BrowseImpactLevelAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.id,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }
}
