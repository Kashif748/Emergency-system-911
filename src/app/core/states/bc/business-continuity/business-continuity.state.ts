import {EMPTY} from "rxjs";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {catchError, finalize, tap} from "rxjs/operators";
import {patch} from "@ngxs/store/operators";
import {Injectable} from "@angular/core";
import {BcVersions} from "../../../../api/models/bc-versions";
import {BcVersionsControllerService} from "../../../../api/services/bc-versions-controller.service";
import {BCAction} from "@core/states/bc/business-continuity/business-continuity.action";
import {PageBcVersions} from "../../../../api/models/page-bc-versions";
import {BcVersionsStatus} from "../../../../api/models/bc-versions-status";


export interface BusinessContinuityStateModel {
  versions: PageBcVersions;
  bc: BcVersions;
  status: BcVersionsStatus;
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
  static versions(state: BusinessContinuityStateModel) {
     return state?.versions?.content;
  }

  @Selector([BusinessContinuityState])
  static status(state: BusinessContinuityStateModel) {
    return state?.status;
  }

  @Selector([BusinessContinuityState])
  static bc(state: BusinessContinuityStateModel) {
    return state?.bc;
  }

  @Selector([BusinessContinuityState])
  static totalRecords(state: BusinessContinuityStateModel) {
     return state?.versions?.totalElements;
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
      .getAll10({
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
          const sortedVersions = res.result.content.sort((a, b) => b.id - a.id);
          setState(
            patch<BusinessContinuityStateModel>({
              versions: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<BusinessContinuityStateModel>({
              versions: { content: [], totalElements: 0 },
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
      .insertOne1({
        body: payload,
      })
      .pipe(
        tap((bc) => {
          setState(
            patch<BusinessContinuityStateModel>({
              bc: bc.result,
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
      tap((bc) => {
        setState(
          patch<BusinessContinuityStateModel>({
            bc: bc.result,
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

  @Action(BCAction.Status, { cancelUncompleted: true })
  getstatus(
    { setState }: StateContext<BusinessContinuityStateModel>,
    { payload }: BCAction.Status
  ) {
    /*if (payload.id === undefined || payload.id === null) {
      setState(
        patch<BusinessContinuityStateModel>({
          bc: undefined,
        })
      );
      return;
    }*/
    setState(
      patch<BusinessContinuityStateModel>({
        blocking: true,
      })
    );
    return this.bC.manageVersionStatus({ versionId: payload.versionId, statusId: payload.statusId }).pipe(
      tap((status) => {
        setState(
          patch<BusinessContinuityStateModel>({
            status: status.result,
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
