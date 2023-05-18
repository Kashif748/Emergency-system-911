import {EMPTY} from "rxjs";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {catchError, finalize, tap} from "rxjs/operators";
import {patch} from "@ngxs/store/operators";
import {Injectable} from "@angular/core";
import {BcVersions} from "../../../../api/models/bc-versions";
import {BcVersionsControllerService} from "../../../../api/services/bc-versions-controller.service";
import {BCAction} from "@core/states/bc/business-continuity/business-continuity.action";
import {PageBcVersions} from "../../../../api/models/page-bc-versions";


export interface BusinessContinuityStateModel {
  page: PageBcVersions;
  bc: BcVersions;
  loading: boolean;
  blocking: boolean;
}

const BC_STATE_TOKEN = new StateToken<BusinessContinuityState>('bc');

@State<BusinessContinuityState>({ name: BC_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class BusinessContinuityState {
  /**
   *
   */
  constructor(
    private bC: BcVersionsControllerService
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([BusinessContinuityState])
  static page(state: BusinessContinuityStateModel) {
     return state?.page?.content;
  }

  @Selector([BusinessContinuityState])
  static bc(state: BusinessContinuityStateModel) {
    return state?.bc;
  }

  @Selector([BusinessContinuityState])
  static totalRecords(state: BusinessContinuityStateModel) {
     return state?.page?.totalElements;
  }

  @Selector([BusinessContinuityState])
  static loading(state: BusinessContinuityStateModel) {
    return state?.loading;
  }

  @Selector([BusinessContinuityState])
  static blocking(state: BusinessContinuityStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(BCAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<BusinessContinuityStateModel>,
    { payload }: BCAction.LoadPage
  ) {
    setState(
      patch<BusinessContinuityStateModel>({
        loading: true,
      })
    );
    return this.bC
      .getAll9({
        isActive: true,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
        },
        // request: payload.filters,
      })
      .pipe(
        tap((res) => {
          setState(
            patch<BusinessContinuityStateModel>({
               page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<BusinessContinuityStateModel>({
               page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<BusinessContinuityStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(BCAction.Create)
  create(
    { setState }: StateContext<BusinessContinuityStateModel>,
    { payload }: BCAction.Create
  ) {
    setState(
      patch<BusinessContinuityStateModel>({
        blocking: true,
      })
    );
    return this.bC
      .insertOne({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<BusinessContinuityStateModel>({
              blocking: false,
            })
          );
        })
      );
  }



  @Action(BCAction.GetBc, { cancelUncompleted: true })
  getBc(
    { setState }: StateContext<BusinessContinuityStateModel>,
    { payload }: BCAction.GetBc
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<BusinessContinuityStateModel>({
          bc: undefined,
        })
      );
      return;
    }
    setState(
      patch<BusinessContinuityStateModel>({
        blocking: true,
      })
    );
    return this.bC.getOne({ id: payload.id }).pipe(
      tap((rto) => {
        setState(
          patch<BusinessContinuityStateModel>({
            bc: rto.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<BusinessContinuityStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
