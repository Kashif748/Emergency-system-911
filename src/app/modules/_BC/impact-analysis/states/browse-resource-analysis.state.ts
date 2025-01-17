import {PageRequestModel} from '@core/models/page-request.model';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {MessageHelper} from '@core/helpers/message.helper';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiHelper} from '@core/helpers/api.helper';
import {TextUtils} from '@core/utils';
import {iif, patch} from '@ngxs/store/operators';
import {BrowseResourceAnalysisAction} from './browse-resource-analysis.action';
import {throwError} from 'rxjs';
import {BrowseOrganizationAction} from '../../organization-activities/states/browse-organization.action';
import {catchError, finalize, tap} from 'rxjs/operators';
import {ResourceAnalysisAction} from '@core/states/impact-analysis/resource-analysis.action';
import {TranslateService} from '@ngx-translate/core';

export interface BrowseReourceAnalysisStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_RESOURCE_ANALYSIS_UI_STATE_TOKEN =
  new StateToken<BrowseReourceAnalysisStateModel>('browse_resource_analysis');

@State<BrowseReourceAnalysisStateModel>({
  name: BROWSE_RESOURCE_ANALYSIS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 5,
    },
    columns: [
      'orgHierarchy',
      'cycle',
      'staffOnSite',
      'staffRemotely',
      'status',
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseResourceAnalysisState {
  /**
   *
   */
  constructor(
    private apiHelper: ApiHelper,
    private messageHelper: MessageHelper,
    private router: Router,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {}
  /* ************************ SELECTORS ******************** */
  @Selector([BrowseResourceAnalysisState])
  static state(
    state: BrowseReourceAnalysisStateModel
  ): BrowseReourceAnalysisStateModel {
    return state;
  }

  @Selector([BrowseResourceAnalysisState])
  static hasFilters(state: BrowseReourceAnalysisStateModel): boolean {
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
  @Action(BrowseResourceAnalysisAction.LoadPage)
  LoadPage(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseReourceAnalysisStateModel>,
    { payload }: BrowseResourceAnalysisAction.LoadPage
  ) {
    setState(
      patch<BrowseReourceAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new ResourceAnalysisAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest?.filters?.orgHierarchyId?.id,
          cycleId: pageRequest?.filters?.cycleId,
        },
      })
    );
  }

  @Action(BrowseResourceAnalysisAction.Sort)
  sortResource(
    {
      setState,
      dispatch,
      getState,
    }: StateContext<BrowseReourceAnalysisStateModel>,
    { payload }: BrowseResourceAnalysisAction.Sort
  ) {
    setState(
      patch<BrowseReourceAnalysisStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new ResourceAnalysisAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
          orgHierarchyId: pageRequest.filters.orgHierarchyId?.id,
        },
      })
    );
  }

  @Action(BrowseResourceAnalysisAction.CreateResourceAnalysis)
  createResource(
    { dispatch }: StateContext<BrowseReourceAnalysisStateModel>,
    { payload }: BrowseResourceAnalysisAction.CreateResourceAnalysis
  ) {
    return dispatch(new ResourceAnalysisAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch([
          new BrowseResourceAnalysisAction.LoadPage(),
        ]);
      }),
      catchError((err) => {
        if (err.status === 409) {
          this.messageHelper.error({
            detail: this.translate.instant('BC_COPYING_ERROR_MESSAGE'),
          });
        } else {
          this.messageHelper.error({ error: err });
        }
        return throwError(err);
      })
    );
  }

  @Action(BrowseResourceAnalysisAction.UpdateResourceAnalysis)
  updateResource(
    { dispatch }: StateContext<BrowseReourceAnalysisStateModel>,
    { payload }: BrowseResourceAnalysisAction.UpdateResourceAnalysis
  ) {
    return dispatch(new ResourceAnalysisAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseResourceAnalysisAction.LoadPage());
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return throwError(err);
      }),
      finalize(() => {
        dispatch(new BrowseOrganizationAction.ToggleDialog({}));
      })
    );
  }

  @Action(BrowseResourceAnalysisAction.UpdateFilter, {
    cancelUncompleted: true,
  })
  updateFilter(
    { setState, getState }: StateContext<BrowseReourceAnalysisStateModel>,
    { payload }: BrowseResourceAnalysisAction.UpdateFilter
  ) {
    setState(
      patch<BrowseReourceAnalysisStateModel>({
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

  @Action(BrowseResourceAnalysisAction.ToggleDialog, {
    cancelUncompleted: true,
  })
  openDialog(
    {}: StateContext<BrowseReourceAnalysisStateModel>,
    { payload }: BrowseResourceAnalysisAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'resources'
            ? undefined
              : 'resources',
        _id: payload.resourceId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseResourceAnalysisAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseReourceAnalysisStateModel>,
    { payload }: BrowseResourceAnalysisAction.ChangeColumns
  ) {
    setState(
      patch<BrowseReourceAnalysisStateModel>({
        columns: payload.columns,
      })
    );
  }
  @Action(BrowseResourceAnalysisAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseReourceAnalysisStateModel>,
    { payload }: BrowseResourceAnalysisAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'resources',
        _id: payload.id,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
