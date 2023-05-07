import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {patch} from "@ngxs/store/operators";
import {catchError, finalize, map, switchMap, tap} from "rxjs/operators";
import {EMPTY, of} from "rxjs";
import {Bcrto} from "../../../api/models/bcrto";
import { RtoAction} from "@core/states/bc/rto.action";
import {BcrtoControllerService} from "../../../api/services/bcrto-controller.service";


export interface RtoStateModel {
  page: Bcrto[];
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
  constructor(
    private rto: BcrtoControllerService
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([RtoState])
  static page(state: RtoStateModel) {
    return state?.page;
  }

  @Selector([RtoState])
  static rto(state: RtoStateModel) {
    return state?.rto;
  }

/*  @Selector([RtoState])
  static totalRecords(state: RtoStateModel) {
    return state?.page;
  }*/

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
    setState(
      patch<RtoStateModel>({
        loading: true,
      })
    );
    return this.rto
      .getAll10({
        isActive: true,
        versionId: 1
       /* pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        request: payload.filters,*/
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
               // page: { content: [], totalElements: 0 },
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
      .insertOne1({
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
    return this.rto.getOne1({ id: payload.id }).pipe(
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
}
