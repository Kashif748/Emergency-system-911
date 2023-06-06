import { Injectable } from '@angular/core';
import { ApiHelper } from '@core/helpers/api.helper';
import { PageRequestModel } from '@core/models/page-request.model';
import { NewsAction } from '@core/states/news/news.action';
import { TextUtils } from '@core/utils';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { iif, patch } from '@ngxs/store/operators';
import { NewsBarAction } from './news-bar.action';

export interface NewsBarStateModel {
  pageRequest: PageRequestModel;
}

export const BROWSE_USERS_UI_STATE_TOKEN = new StateToken<NewsBarStateModel>(
  'news_bar'
);

@State<NewsBarStateModel>({
  name: BROWSE_USERS_UI_STATE_TOKEN,
  defaults: {
    pageRequest: {
      filters: {
        activeNews: true,
      },
      first: 0,
      rows: 10,
      sortField: 'createdDate',
      sortOrder: 'desc',
    },
  },
})
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class NewsBarState {
  /**
   *
   */
  constructor(private apiHelper: ApiHelper) {}
  /* ************************ SELECTORS ******************** */
  @Selector([NewsBarState])
  static state(state: NewsBarStateModel): NewsBarStateModel {
    return state;
  }

  @Selector([NewsBarState])
  static hasFilters(state: NewsBarStateModel): boolean {
    return (
      Object.keys(state.pageRequest.filters).filter(
        (k) =>
          k !== 'active' &&
          !TextUtils.IsEmptyOrWhiteSpaces(state.pageRequest.filters[k])
      ).length > 0
    );
  }
  /* ********************** ACTIONS ************************* */
  @Action(NewsBarAction.LoadNews)
  loadNews(
    { setState, dispatch, getState }: StateContext<NewsBarStateModel>,
    { payload }: NewsBarAction.LoadNews
  ) {
    setState(
      patch<NewsBarStateModel>({
        pageRequest: patch<PageRequestModel>({
          first: iif(!!payload?.pageRequest, payload?.pageRequest?.first),
          rows: iif(!!payload?.pageRequest, payload?.pageRequest?.rows),
        }),
      })
    );
    const pageRequest = getState().pageRequest;
    return dispatch(
      new NewsAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: this.filters(pageRequest),
      })
    );
  }

  @Action(NewsBarAction.SortNews)
  sortNews(
    { setState, dispatch, getState }: StateContext<NewsBarStateModel>,
    { payload }: NewsBarAction.SortNews
  ) {
    setState(
      patch<NewsBarStateModel>({
        pageRequest: patch<PageRequestModel>({
          sortOrder: iif((_) => payload.order?.length > 0, payload.order),
          sortField: iif((_) => payload.field !== undefined, payload.field),
        }),
      })
    );

    const pageRequest = getState().pageRequest;
    return dispatch(
      new NewsAction.LoadPage({
        page: this.apiHelper.page(pageRequest),
        size: pageRequest.rows,
        sort: this.apiHelper.sort(pageRequest),
        filters: this.filters(pageRequest),
      })
    );
  }

  @Action(NewsBarAction.UpdateFilter, { cancelUncompleted: true })
  updateFilter(
    { setState }: StateContext<NewsBarStateModel>,
    { payload }: NewsBarAction.UpdateFilter
  ) {
    setState(
      patch<NewsBarStateModel>({
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

  /* ********************** UTILS ************************* */
  private filters(pageRequest: PageRequestModel) {
    const orgIds = pageRequest.filters.orgIds?.map((o) => o.key);
    const roleIds = pageRequest.filters.roleIds?.map((r) => r.id);
    return {
      ...pageRequest.filters,
      orgIds: orgIds?.length > 0 ? orgIds : undefined,
      roleIds: roleIds?.length > 0 ? roleIds : undefined,
    };
  }
}
