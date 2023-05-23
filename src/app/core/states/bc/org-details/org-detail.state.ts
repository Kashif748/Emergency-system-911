import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {patch} from "@ngxs/store/operators";
import {finalize, tap} from "rxjs/operators";
import {OrgStructure} from "../../../../api/models/org-structure";
import {OrgDetailAction} from "@core/states/bc/org-details/org-detail.action";
import {OrgStructureControllerService} from "../../../../api/services/org-structure-controller.service";


export interface OrgDetailStateModel {
  // page: PageBcrto;
  org: OrgStructure;
  loading: boolean;
  blocking: boolean;
}

const RTO_STATE_TOKEN = new StateToken<OrgDetailStateModel>('orgDetail');

@State<OrgDetailStateModel>({ name: RTO_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class OrgDetailState {
  /**
   *
   */
  constructor(
    private org: OrgStructureControllerService,
  ) {
  }

  /* ************************ SELECTORS ******************** */
/*  @Selector([OrgDetailState])
  static page(state: OrgDetailStateModel) {
    return state?.page?.content;
  }*/

  @Selector([OrgDetailState])
  static org(state: OrgDetailStateModel) {
    return state?.org;
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
  /*@Action(OrgDetailAction.LoadPage, { cancelUncompleted: true })
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
  }*/

  /*@Action(OrgDetailAction.Create)
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
  }*/

  @Action(OrgDetailAction.Update)
  update(
    { setState, getState}: StateContext<OrgDetailStateModel>,
    { payload }: OrgDetailAction.Update
  ) {
    setState(
      patch<OrgDetailStateModel>({
        blocking: true,
      })
    );
    const orgBody = getState().org;
    // orgBody.description = payload.description
    return this.org
      .active1({
        id: {...orgBody, ...payload} as OrgStructure,
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
  getOrgDetail(
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
    return this.org.getById5({ id: payload.id }).pipe(
      tap((orgDetail) => {
        setState(
          patch<OrgDetailStateModel>({
             org: orgDetail.result,
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
