import {EMPTY} from "rxjs";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {catchError, finalize, tap} from "rxjs/operators";
import {patch} from "@ngxs/store/operators";
import {Injectable} from "@angular/core";
import {BcImpactTypesMatrixControllerService} from "../../../../api/services/bc-impact-types-matrix-controller.service";
import {PageBcImpactTypesMatrix} from "../../../../api/models/page-bc-impact-types-matrix";
import {BcImpactTypesMatrix} from "../../../../api/models/bc-impact-types-matrix";
import {ImpactMatrixAction} from "@core/states/bc/impact-matrix/impact-matrix.action";


export interface ImpactMatrixStateModel {
  page: PageBcImpactTypesMatrix;
  impactMatrix: BcImpactTypesMatrix;
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
    private impactMatrix: BcImpactTypesMatrixControllerService
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([ImpactMatrixState])
  static page(state: ImpactMatrixStateModel) {
    return state?.page?.content;
  }

  @Selector([ImpactMatrixState])
  static impactMatrix(state: ImpactMatrixStateModel) {
    return state?.impactMatrix;
  }

  @Selector([ImpactMatrixState])
  static totalRecords(state: ImpactMatrixStateModel) {
    return state?.page?.totalElements;
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
    return this.impactMatrix
      .getAll16({
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
            patch<ImpactMatrixStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ImpactMatrixStateModel>({
              page: {content: [], totalElements: 0},
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

  /*@Action(ImpactMatrixAction.Create)
  create(
    {setState}: StateContext<ImpactMatrixStateModel>,
    {payload}: ImpactMatrixAction.Create
  ) {
    setState(
      patch<ImpactMatrixStateModel>({
        blocking: true,
      })
    );
    return this.impactMatrix
      .insertOne1({
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
  }*/

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
  GetImpactMatrix(
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
    return this.impactMatrix.getOne7({id: payload.id}).pipe(
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
