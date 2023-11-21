import { PageRequestModel } from '@core/models/page-request.model';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { MessageHelper } from '@core/helpers/message.helper';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiHelper } from '@core/helpers/api.helper';
import { TextUtils } from '@core/utils';
import { iif, patch } from '@ngxs/store/operators';
import { BrowseImpactAnalysisAction } from './browse-impact-analysis.action';
import { ImapactAnalysisAction } from '@core/states/impact-analysis/impact-analysis.action';
import {
  catchError,
  concatMap,
  delay,
  filter,
  finalize,
  map,
  tap,
} from 'rxjs/operators';
import { EMPTY, from } from 'rxjs';
import { BrowseResourceAnalysisAction } from './browse-resource-analysis.action';
import { BcActivityAnalysisRequest } from 'src/app/api/models/bc-activity-analysis-request';
import { BcActivityAnalysis } from 'src/app/api/models';

export interface BrowseImpactAnalysisStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  progressbar: {
    value: number;
    length: number;
    success: any[];
    failed: any[];
    currentId: number;
  };
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_IMPACT_ANALYSIS_UI_STATE_TOKEN =
  new StateToken<BrowseImpactAnalysisStateModel>('browse_impact_analysis');

@State<BrowseImpactAnalysisStateModel>({
  name: BROWSE_IMPACT_ANALYSIS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'activityName',
      'activityFrequency',
      'analysisCycle',
      'rto',
      'priorityLevel',
      'status',
    ],
    progressbar: {
      length: 0,
      value: 0,
      success: [],
      failed: [],
      currentId: null,
    },

    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseImpactAnalysisState {
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
  @Selector([BrowseImpactAnalysisState])
  static state(
    state: BrowseImpactAnalysisStateModel
  ): BrowseImpactAnalysisStateModel {
    return state;
  }
  @Selector([BrowseImpactAnalysisState])
  static progressbar(state: any): BrowseImpactAnalysisStateModel {
    return state.progressbar;
  }

  @Selector([BrowseImpactAnalysisState])
  static hasFilters(state: BrowseImpactAnalysisStateModel): boolean {
    const filters = state.pageRequest.filters;
    return (
      !('orgHierarchyId' in filters && 'cycleId' in filters) ||
      Object.keys(filters).filter(
        (k) =>
          k !== 'active' &&
          k !== 'orgHierarchyId' &&
          k !== 'cycleId' &&
          !TextUtils.IsEmptyOrWhiteSpaces(filters[k])
      ).length > 0
    );
  }

  /* ********************** ACTIONS ************************* */
  @Action(BrowseImpactAnalysisAction.Reset)
  Reset({ setState }: StateContext<BrowseImpactAnalysisStateModel>) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        progressbar: {
          length: 0,
          value: 0,
          success: [],
          failed: [],
          currentId: null,
        },
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.LoadPage)
  LoadPage(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.LoadPage
  ) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImapactAnalysisAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest?.filters?.orgHierarchyId?.id,
        },
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.Sort)
  sort(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.Sort
  ) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new ImapactAnalysisAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.LoadActivitiesStatuses)
  LoadActivitiesStatuses(
    { dispatch }: StateContext<BrowseImpactAnalysisStateModel>,
    {}: BrowseImpactAnalysisAction.LoadActivitiesStatuses
  ) {
    return dispatch(new ImapactAnalysisAction.LoadActivitiesStatuses());
  }

  @Action(BrowseImpactAnalysisAction.LoadCycles)
  LoadCycles(
    { dispatch }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.LoadCycles
  ) {
    return dispatch(
      new ImapactAnalysisAction.LoadCycles({
        page: payload?.page,
        size: payload.size,
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.LoadAnalysisStatusInfo)
  loadAnalysisStatusInfo(
    { dispatch }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.LoadAnalysisStatusInfo
  ) {
    return dispatch(
      new ImapactAnalysisAction.LoadAnalysisStatusInfo({
        orgHierarchyId: payload.orgHierarchyId,
        cycleId: payload.cycleId,
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.CreateCycle)
  CreateCycle(
    { dispatch, getState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.CreateCycle
  ) {
    return dispatch(new ImapactAnalysisAction.CreateCycle(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseImpactAnalysisAction.LoadPage(),
          new BrowseImpactAnalysisAction.ToggleDialog({}),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.SetCycleActivities)
  SetCycleActivities(
    { dispatch, getState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.SetCycleActivities
  ) {
    return dispatch(new ImapactAnalysisAction.SetCycleActivities(payload)).pipe(
      tap((res) => {
        this.messageHelper.success();
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.duplicateActivities)
  duplicateActivities(
    {
      dispatch,
      setState,
      getState,
    }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.duplicateActivities
  ) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        progressbar: patch({
          length: payload.length,
        }),
      })
    );
    // Use the concatMap operator to make requests sequentially for duplicate each activity

    const duplicateActiviesObservable = from(payload);

    return duplicateActiviesObservable.pipe(
      concatMap((item: BcActivityAnalysis, index) => {
        // current loading activity
        setState(
          patch<BrowseImpactAnalysisStateModel>({
            progressbar: patch({
              currentId: item.activity.id,
            }),
          })
        );
        // duplicate action
        return dispatch(
          new ImapactAnalysisAction.duplicateActivities({
            activityAnalysisId: item.id,
          })
        ).pipe(
          map(() => ({ item, index })),
          // catch failed activities to show on UI usinf failed array
          catchError((error) => {
            setState(
              patch<BrowseImpactAnalysisStateModel>({
                progressbar: patch({
                  currentId: null,
                  failed: [...getState().progressbar.failed, item.activity.id],
                }),
              })
            );
            return EMPTY;
          })
        );
      }),
      // update progress value and success dupication calls
      tap(({ item, index }) =>
        setState(
          patch<BrowseImpactAnalysisStateModel>({
            progressbar: patch({
              value: ((index + 1) * 100) / payload?.length,
              currentId: null,
              success: [...getState().progressbar.success, item.activity.id],
            }),
          })
        )
      ),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.UpdateFilter
  ) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: 0,
          filters: iif(
            payload.clear === true,
            {
              orgHierarchyId: (v) => v,
              cycleId: (v) => v,
            },
            patch({
              ...payload,
            })
          ),
        }),
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.UpdateBulkTransaction)
  updatebulk(
    { dispatch }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.UpdateBulkTransaction
  ) {
    return dispatch(
      new ImapactAnalysisAction.UpdateBulkTransaction(payload)
    ).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseImpactAnalysisAction.LoadPage(),
          new BrowseResourceAnalysisAction.LoadPage(),
        ]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return EMPTY;
      }),
      finalize(() => {
        dispatch(new BrowseImpactAnalysisAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseImpactAnalysisAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog(
    {}: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == payload?.dialog
            ? undefined
            : payload?.dialog,
        _id: payload.id,
        _cycleId: payload.cycle,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseImpactAnalysisAction.UpdateRoute, {
    cancelUncompleted: true,
  })
  updateRoute(
    { getState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.UpdateRoute
  ) {
    const currentState = getState();
    this.router.navigate([], {
      queryParams: {
        _division: currentState.pageRequest.filters.orgHierarchyId.id,
        _cycle: currentState.pageRequest.filters.cycleId.id,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseImpactAnalysisAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.ChangeColumns
  ) {
    setState(
      patch<BrowseImpactAnalysisStateModel>({
        columns: payload.columns,
      })
    );
  }
  @Action(BrowseImpactAnalysisAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseImpactAnalysisStateModel>,
    { payload }: BrowseImpactAnalysisAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'activities',
        _id: payload.id,
        _cycleId: payload.cycle,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
