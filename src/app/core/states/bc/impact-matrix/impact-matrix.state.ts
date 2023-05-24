import {EMPTY} from "rxjs";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store} from "@ngxs/store";
import {catchError, finalize, tap} from "rxjs/operators";
import {patch} from "@ngxs/store/operators";
import {Injectable} from "@angular/core";
import {BcImpactTypesMatrixControllerService} from "../../../../api/services/bc-impact-types-matrix-controller.service";
import {BcImpactTypesMatrix} from "../../../../api/models/bc-impact-types-matrix";
import {ImpactMatrixAction} from "@core/states/bc/impact-matrix/impact-matrix.action";
import {BrowseBusinessContinuityState} from "../../../../modules/_business-continuity/states/browse-business-continuity.state";
import {BcImpactMatrixDto} from "../../../../api/models/bc-impact-matrix-dto";


export interface ImpactMatrixStateModel {
  page: BcImpactMatrixDto[] ;
  impactMatrix: BcImpactMatrixDto;
  loading: boolean;
  blocking: boolean;
}


const IMPACT_MATRIX_STATE_TOKEN = new StateToken<ImpactMatrixStateModel>('impactMatrix');

@State<ImpactMatrixStateModel>({name: IMPACT_MATRIX_STATE_TOKEN})
@Injectable()
@SelectorOptions({injectContainerState: false})
export class ImpactMatrixState {
  /**
   *
   */
  constructor(
    private impactMatrix: BcImpactTypesMatrixControllerService,
    private store: Store,
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([ImpactMatrixState])
  static page(state: ImpactMatrixStateModel) {
    return state?.page;
  }

  @Selector([ImpactMatrixState])
  static impactMatrix(state: ImpactMatrixStateModel) {
    return state?.impactMatrix;
  }

  @Selector([ImpactMatrixState])
  static totalRecords(state: ImpactMatrixStateModel) {
    return state?.page?.length;
  }

  @Selector([ImpactMatrixState])
  static loading(state: ImpactMatrixStateModel) {
    return state?.loading;
  }

  @Selector([ImpactMatrixState])
  static blocking(state: ImpactMatrixStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ImpactMatrixAction.LoadPage, {cancelUncompleted: true})
  loadPage(
    {setState}: StateContext<ImpactMatrixStateModel>,
    {payload}: ImpactMatrixAction.LoadPage
  ) {
    setState(
      patch<ImpactMatrixStateModel>({
        loading: true,
      })
    );
    const versionID = this.store.selectSnapshot(BrowseBusinessContinuityState.versionId);
    return this.impactMatrix
      .findAll1({
        isActive: true,
        versionId: versionID,
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
            patch<ImpactMatrixStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ImpactMatrixStateModel>({
              page:   [],
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ImpactMatrixStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ImpactMatrixAction.Create)
  create(
    {setState}: StateContext<ImpactMatrixStateModel>,
    {payload}: ImpactMatrixAction.Create
  ) {
    setState(
      patch<ImpactMatrixStateModel>({
        blocking: true,
      })
    );
    const versionID = this.store.selectSnapshot(BrowseBusinessContinuityState.versionId);
    payload.bcImpactTypes.versionId = versionID;
    return this.impactMatrix
      .insert({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ImpactMatrixStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ImpactMatrixAction.Update)
  update(
    {setState}: StateContext<ImpactMatrixStateModel>,
    {payload}: ImpactMatrixAction.Update
  ) {
    setState(
      patch<ImpactMatrixStateModel>({
        blocking: true,
      })
    );
    return this.impactMatrix
      .update86({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ImpactMatrixStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ImpactMatrixAction.GetImpactMatrix, {cancelUncompleted: true})
  getImpactMatrix(
    {setState}: StateContext<ImpactMatrixStateModel>,
    {payload}: ImpactMatrixAction.GetImpactMatrix
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ImpactMatrixStateModel>({
          impactMatrix: undefined,
        })
      );
      return;
    }
    setState(
      patch<ImpactMatrixStateModel>({
        blocking: true,
      })
    );
    return this.impactMatrix.getOneByImpactTypeId({id: payload.id}).pipe(
      tap((impactMatrix) => {
        setState(
          patch<ImpactMatrixStateModel>({
            impactMatrix: impactMatrix.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ImpactMatrixStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
