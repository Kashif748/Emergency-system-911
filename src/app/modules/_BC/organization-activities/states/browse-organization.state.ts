import {Injectable} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ApiHelper} from '@core/helpers/api.helper';
import {MessageHelper} from '@core/helpers/message.helper';
import {PageRequestModel} from '@core/models/page-request.model';
import {TextUtils} from '@core/utils';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {iif, patch} from '@ngxs/store/operators';
import {throwError} from 'rxjs';
import {catchError, finalize, tap} from 'rxjs/operators';
import {BrowseOrganizationAction} from "./browse-organization.action";
import {OrgActivityAction} from "@core/states/org-activities/orgActivity.action";

export interface BrowseOrgActivityStateModel {
  pageRequest: PageRequestModel;
  columns: string[];
  view: 'TABLE' | 'CARDS';
}

export const BROWSE_ORG_ACTIVITY_UI_STATE_TOKEN =
  new StateToken<BrowseOrgActivityStateModel>('browse_org_activities');

@State<BrowseOrgActivityStateModel>({
  name: BROWSE_ORG_ACTIVITY_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {},
      first: 0,
      rows: 10,
    },
    columns: [
      'nameEn',
      'nameAr',
      'activityFrequence',
      'internal',
      'externalReference'
    ],
    view: 'TABLE',
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BrowseOrganizationState {
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
  @Selector([BrowseOrganizationState])
  static state(state: BrowseOrganizationState): BrowseOrganizationState {
    return state;
  }

  @Selector([BrowseOrganizationState])
  static hasFilters(state: BrowseOrgActivityStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter(
        (k) =>
          k !== 'type' &&
          !TextUtils.IsEmptyOrWhiteSpaces(state.pageRequest.filters[k])
      ).length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(BrowseOrganizationAction.LoadOrganization)
  loadOrganization(
    { setState, dispatch, getState }: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.LoadOrganization
  ) {
    setState(
      patch<BrowseOrgActivityStateModel>({
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
      new OrgActivityAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(BrowseOrganizationAction.SortOrganization)
  sortOrganization(
    { setState, dispatch, getState }: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.SortOrganization
  ) {
    setState(
      patch<BrowseOrgActivityStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new OrgActivityAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: {
          ...pageRequest.filters,
        },
      })
    );
  }

  @Action(BrowseOrganizationAction.ChangeColumns)
  changeColumns(
    { setState }: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.ChangeColumns
  ) {
    setState(
      patch<BrowseOrgActivityStateModel>({
        columns: payload.columns,
      })
    );
  }

  @Action(BrowseOrganizationAction.ChangeView)
  changeView(
    { setState }: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.ChangeView
  ) {
    setState(
      patch<BrowseOrgActivityStateModel>({
        view: payload.view,
      })
    );
  }

  @Action(BrowseOrganizationAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.UpdateFilter
  ) {
    setState(
      patch<BrowseOrgActivityStateModel>({
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

    if (payload?.type) {
      return this.router.navigate([], {
        queryParams: {
          _type: payload?.type,
        },
        queryParamsHandling: 'merge',
      });
    }
  }

  @Action(BrowseOrganizationAction.CreateOrganization)
  createOrganization(
    { dispatch }: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.CreateOrganization
  ) {
    return dispatch(new OrgActivityAction.Create(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(
          [new BrowseOrganizationAction.LoadOrganization(),
            new BrowseOrganizationAction.ToggleDialog({})]);
      }),
      catchError((err) => {
        this.messageHelper.error({ error: err });
        return throwError(err);
      })
    );
  }

  @Action(BrowseOrganizationAction.UpdateOrganization)
  updateOrg(
    { dispatch }: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.UpdateOrganization
  ) {
    return dispatch(new OrgActivityAction.Update(payload)).pipe(
      tap(() => {
        this.messageHelper.success();
        dispatch(new BrowseOrganizationAction.LoadOrganization());
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

  @Action(BrowseOrganizationAction.ToggleDialog, { cancelUncompleted: true })
  openDialog(
    {}: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.ToggleDialog
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.organizationId,
        _mode: undefined,
      },
      queryParamsHandling: 'merge',
    });
  }

  @Action(BrowseOrganizationAction.OpenView, { cancelUncompleted: true })
  openView(
    {}: StateContext<BrowseOrgActivityStateModel>,
    { payload }: BrowseOrganizationAction.OpenView
  ) {
    this.router.navigate([], {
      queryParams: {
        _dialog:
          this.route.snapshot.queryParams['_dialog'] == 'opened'
            ? undefined
            : 'opened',
        _id: payload.organizationId,
        _mode: 'viewonly',
      },
      queryParamsHandling: 'merge',
    });
  }
}
