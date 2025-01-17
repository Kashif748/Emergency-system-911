import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {patch} from '@ngxs/store/operators';
import {catchError, finalize, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {Bcrto} from '../../../../api/models/bcrto';
import {BcrtoControllerService} from '../../../../api/services/bcrto-controller.service';
import {PageBcrto} from '../../../../api/models/page-bcrto';
import {RtoAction} from '@core/states';
import {ILangFacade} from "@core/facades/lang.facade";
import {UrlHelperService} from "@core/services/url-helper.service";

export interface RtoStateModel {
  page: PageBcrto;
  rto: Bcrto;
  loading: boolean;
  blocking: boolean;
}

const RTO_STATE_TOKEN = new StateToken<RtoStateModel>('rto');

@State<RtoStateModel>({ name: RTO_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class RtoState {
  /**
   *
   */
  constructor(private rto: BcrtoControllerService, private store: Store,
              private langFacade: ILangFacade, private urlHelper: UrlHelperService) {}

  /* ************************ SELECTORS ******************** */
  @Selector([RtoState])
  static page(state: RtoStateModel) {
    return state?.page?.content;
  }

  @Selector([RtoState])
  static rto(state: RtoStateModel) {
    return state?.rto;
  }

  @Selector([RtoState])
  static totalRecords(state: RtoStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([RtoState])
  static loading(state: RtoStateModel) {
    return state?.loading;
  }

  @Selector([RtoState])
  static blocking(state: RtoStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(RtoAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<RtoStateModel>,
    { payload }: RtoAction.LoadPage
  ) {
    if (payload.versionId === undefined || payload.versionId === null) {
      return;
    }
    setState(
      patch<RtoStateModel>({
        loading: true,
      })
    );
    return this.rto
      .getAll12({
        isActive: true,
        versionId: payload.versionId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<RtoStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<RtoStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<RtoStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(RtoAction.Create)
  create(
    { setState }: StateContext<RtoStateModel>,
    { payload }: RtoAction.Create
  ) {
    setState(
      patch<RtoStateModel>({
        blocking: true,
      })
    );
    return this.rto
      .insertOne4({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RtoStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(RtoAction.Update)
  update(
    { setState }: StateContext<RtoStateModel>,
    { payload }: RtoAction.Update
  ) {
    setState(
      patch<RtoStateModel>({
        blocking: true,
      })
    );
    return this.rto
      .update85({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RtoStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(RtoAction.GetRto, { cancelUncompleted: true })
  getRto(
    { setState }: StateContext<RtoStateModel>,
    { payload }: RtoAction.GetRto
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<RtoStateModel>({
          rto: undefined,
        })
      );
      return;
    }
    setState(
      patch<RtoStateModel>({
        blocking: true,
      })
    );
    return this.rto.getOne4({ id: payload.id }).pipe(
      tap((rto) => {
        setState(
          patch<RtoStateModel>({
            rto: rto.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<RtoStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(RtoAction.Export, { cancelUncompleted: true })
  export({}: StateContext<RtoStateModel>, { payload }: RtoAction.Export) {
    return this.rto
      .exportAsAspose({
        as: payload.type,
        lang: this.langFacade.stateSanpshot.ActiveLang.key == 'ar',
        isActive: true,
        versionId: payload.versionId,
      })
      .pipe(
        tap((res: any) => {
          const newBlob = new Blob([res], {
            type: `application/${
              payload.type === 'PDF'
                ? 'pdf'
                : 'vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              }`,
          });
          this.urlHelper.downloadBlob(
            newBlob,
            `RTO-LIST - ${new Date().toISOString().split('.')[0]}`
          );
        })
      );
  }
}
