import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { MessageHelper } from '@core/helpers/message.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { SituationsAction } from '@core/states/situations/situations.action';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { BrowseSituationsAction } from './browse-situations.action';

export interface BrowseSituationsStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
  themeTypes: any[];
}

export const BROWSE_SITUATIONS_UI_STATE_TOKEN =
  new StateToken<BrowseSituationsStateModel>('browse_situations');

@State<BrowseSituationsStateModel>({
  name: BROWSE_SITUATIONS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'id',
      'nameAr',
      'nameEn',
      'newsType',
      'themeType',
      'startDate',
      'endDate',
      'actions',
    ],

    view: 'TABLE',
    themeTypes: [
      {
        id: 0,
        color: 'golden',
        nameAr: 'الوضع الذهبي',
        nameEn: 'Golden Theme',
      },
      {
        id: 1,
        color: 'silver',
        nameAr: 'الوضع الفضي',
        nameEn: 'Silver Theme',
      },
      {
        id: 2,
        color: 'bronze',
        nameAr: 'الوضع البرونزي',
        nameEn: 'Bronze Theme',
      },
    ],
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseSituationsState {
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
  @Selector([BrowseSituationsState])
  static state(state: BrowseSituationsStateModel): BrowseSituationsStateModel {
    return state;
  }
  @Selector([BrowseSituationsState])
  static hasFilters(state: BrowseSituationsStateModel): boolean {
    return Object.keys(state.pageRequest.filters).length > 0;
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseSituationsAction.LoadSituations)
  loadSituations(
    { setState, dispatch, getState }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.LoadSituations
  ) {
    setState(
      patch<BrowseSituationsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
          filters: iif(!!payload?.pageRequest, payload?.pageRequest?.filters),
          sortField: 'id',
          sortOrder: 'asc',
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new SituationsAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }
  @Action(BrowseSituationsAction.LoadAttachmentSituations)
  LoadAttachmentSituations(
    { dispatch }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.LoadAttachmentSituations
  ) {
    return dispatch(new SituationsAction.LoadSituationAttachment(payload));
  }
  @Action(BrowseSituationsAction.GetActiveSituation)
  GetActiveSituation({ dispatch }: StateContext<BrowseSituationsStateModel>) {
    return dispatch(new SituationsAction.GetActiveSituation()).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseSituationsAction.CreateSituations)
  CreateSituations(
    { dispatch }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.CreateSituations
  ) {
    return dispatch(new SituationsAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseSituationsAction.LoadSituations(),
          new BrowseSituationsAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseSituationsAction.UpdateSituations)
  UpdateSituations(
    { dispatch }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.UpdateSituations
  ) {
    return dispatch(new SituationsAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseSituationsAction.LoadSituations(),
          new BrowseSituationsAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseSituationsAction.DeleteSituations)
  DeleteSituations(
    { dispatch }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.DeleteSituations
  ) {
    return dispatch(new SituationsAction.Delete(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseSituationsAction.LoadSituations());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseSituationsAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog: this.route.snapshot.queryParams['_dialog']
          ? undefined
          : payload.dialogName,

        _id: payload.situationId,
        _mode: undefined,
        _type: payload.type,
      },
      queryParamsHandling: 'merge',
    });
  }
  @Action(BrowseSituationsAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.ChangeView
  ) {
    setState(
      patch<BrowseSituationsStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseSituationsAction.Export, { cancelUncompleted: true })
  export(
    { dispatch }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.Export
  ) {
    return dispatch(new SituationsAction.Export(payload)).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseSituationsAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.UpdateFilter
  ) {
    setState(
      patch<BrowseSituationsStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: 0,
          filters: iif(
            payload.clear === true,
            {},
            patch({
              ...payload,
            })
          ),
        }),
      })
    );
  }

  @Action(BrowseSituationsAction.GetStatistics)
  getStatistics(
    { dispatch }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.GetStatistics
  ) {
    return dispatch(new SituationsAction.GetStatistics(payload)).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseSituationsAction.GetChartReport)
  getChartReport(
    { dispatch }: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.GetChartReport
  ) {
    return dispatch(new SituationsAction.GetChartReport(payload)).pipe(
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseSituationsAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseSituationsStateModel>,
    { payload }: BrowseSituationsAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog: this.route.snapshot.queryParams['_dialog']
          ? undefined
          : payload.dialogName,
        _id: payload.situationId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
