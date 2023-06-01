import { Injectable } from '@angular/core';
import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { catchError, finalize, tap } from 'rxjs/operators';
import { NewsControllerService } from 'src/app/api/services';
import { NewsAction } from './news.action';
import { patch } from '@ngxs/store/operators';
import { EMPTY } from 'rxjs';
import { DateTimeUtil } from '@core/utils/DateTimeUtil';
import { PageNewsProjection } from 'src/app/api/models';

export interface NewsStateModel {
  page: PageNewsProjection;
  loading: boolean;
  blocking: boolean;
}

const USER_STATE_TOKEN = new StateToken<NewsStateModel>('news');

@State<NewsStateModel>({ name: USER_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class NewsState {
  /**
   *
   */
  constructor(private newsService: NewsControllerService) {}
  /* ************************ SELECTORS ******************** */
  @Selector([NewsState])
  static page(state: NewsStateModel) {
    return state?.page?.content;
  }

  @Selector([NewsState])
  static totalRecords(state: NewsStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([NewsState])
  static loading(state: NewsStateModel) {
    return state?.loading;
  }

  @Selector([NewsState])
  static blocking(state: NewsStateModel) {
    return state?.blocking;
  }
  /* ********************** ACTIONS ************************* */
  @Action(NewsAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<NewsStateModel>,
    { payload }: NewsAction.LoadPage
  ) {
    setState(
      patch<NewsStateModel>({
        loading: true,
      })
    );
    return this.newsService
      .findActivePage6({
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        filter: payload.filters,
      })
      .pipe(
        tap(({ result }) => {
          setState(
            patch<NewsStateModel>({
              page: {
                ...result,
                content: result?.content?.map((u) => {
                  return {
                    ...u,
                    expireDate: DateTimeUtil.getDateInGMTFormat(
                      u.expireDate
                    ) as any,
                  };
                }),
              },
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<NewsStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<NewsStateModel>({
              loading: false,
            })
          );
        })
      );
  }
}
