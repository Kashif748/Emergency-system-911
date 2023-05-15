import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {patch} from "@ngxs/store/operators";
import {catchError, finalize, map, switchMap, tap} from "rxjs/operators";
import {EMPTY, of} from "rxjs";
import {BcrtoControllerService} from "../../../../api/services/bcrto-controller.service";
import {OrgStructure} from "../../../../api/models/org-structure";
import {OrgDetailAction} from "@core/states/bc/org-details/org-detail.action";


export interface OrgDetailStateModel {
  // page: PageBcrto;
  orgDetail: OrgStructure;
  loading: boolean;
  blocking: boolean;
}

const RTO_STATE_TOKEN = new StateToken<OrgDetailStateModel>('rto');

@State<OrgDetailStateModel>({ name: RTO_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class OrgDetailState {
  /**
   *
   */
  constructor(
    private rto: BcrtoControllerService
  ) {
  }

  /* ************************ SELECTORS ******************** */
/*  @Selector([OrgDetailState])
  static page(state: OrgDetailStateModel) {
    return state?.page?.content;
  }*/

  @Selector([OrgDetailState])
  static orgDetail(state: OrgDetailStateModel) {
    return state?.orgDetail;
  }

/*  @Selector([OrgDetailState])
  static totalRecords(state: OrgDetailStateModel) {
    return state?.page?.totalElements;
  }*/

  @Selector([OrgDetailState])
  static loading(state: OrgDetailStateModel) {
    return state?.loading;
  }

  @Selector([OrgDetailState])
  static blocking(state: OrgDetailStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(OrgDetailAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.LoadPage
  ) {
    setState(
      patch<OrgDetailStateModel>({
        loading: true,
      })
    );
    return this.rto
      .getAll10({
        isActive: true,
        versionId: 1,
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
            patch<OrgDetailStateModel>({
              // page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<OrgDetailStateModel>({
              // page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<OrgDetailStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(OrgDetailAction.Create)
  create(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.Create
  ) {
    setState(
      patch<OrgDetailStateModel>({
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
            patch<OrgDetailStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(OrgDetailAction.Update)
  update(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.Update
  ) {
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
      })
    );
    return this.rto
      .update80({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<OrgDetailStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(OrgDetailAction.GetOrgDetail, { cancelUncompleted: true })
  getRto(
    { setState }: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.GetOrgDetail
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<OrgDetailStateModel>({
          // rto: undefined,
        })
      );
      return;
    }
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
      })
    );
    return this.rto.getOne1({ id: payload.id }).pipe(
      tap((orgDetail) => {
        setState(
          patch<OrgDetailStateModel>({
            // orgDetail: orgDetail.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<OrgDetailStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
