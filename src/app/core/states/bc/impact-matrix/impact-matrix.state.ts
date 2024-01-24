import {EMPTY} from 'rxjs';
import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store,} from '@ngxs/store';
import {catchError, finalize, tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';
import {Injectable} from '@angular/core';
import {ImpactMatrixAction} from '@core/states/bc/impact-matrix/impact-matrix.action';
import {BcImpactMatrixDto} from 'src/app/api/models';
import {BcImpactTypesMatrixControllerService} from 'src/app/api/services';
import {UrlHelperService} from "@core/services/url-helper.service";
import {ILangFacade} from "@core/facades/lang.facade";

export interface ImpactMatrixStateModel {
  page: BcImpactMatrixDto[];
  impactMatrix: BcImpactMatrixDto;
  loading: boolean;
  blocking: boolean;
}

const IMPACT_MATRIX_STATE_TOKEN = new StateToken<ImpactMatrixStateModel>(
  'impact_matrix'
);

@State<ImpactMatrixStateModel>({ name: IMPACT_MATRIX_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ImpactMatrixState {
  /**
   *
   */
  constructor(
    private impactMatrix: BcImpactTypesMatrixControllerService,
    private store: Store, private langFacade: ILangFacade, private urlHelper: UrlHelperService
  ) {}

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
  @Action(ImpactMatrixAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ImpactMatrixStateModel>,
    { payload }: ImpactMatrixAction.LoadPage
  ) {
    if (payload.versionId === undefined || payload.versionId === null) {
      return;
    }
    setState(
      patch<ImpactMatrixStateModel>({
        loading: true,
      })
    );

    return this.impactMatrix
      .findAll1({
        isActive: true,
        versionId: payload.versionId,
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
              page: [],
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
    { setState }: StateContext<ImpactMatrixStateModel>,
    { payload }: ImpactMatrixAction.Create
  ) {
    setState(
      patch<ImpactMatrixStateModel>({
        blocking: true,
      })
    );

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
    { setState }: StateContext<ImpactMatrixStateModel>,
    { payload }: ImpactMatrixAction.Update
  ) {
    setState(
      patch<ImpactMatrixStateModel>({
        blocking: true,
      })
    );

    return this.impactMatrix
      .update103({
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

  @Action(ImpactMatrixAction.GetImpactMatrix, { cancelUncompleted: true })
  getImpactMatrix(
    { setState }: StateContext<ImpactMatrixStateModel>,
    { payload }: ImpactMatrixAction.GetImpactMatrix
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
    return this.impactMatrix.getOneByImpactTypeId({ id: payload.id }).pipe(
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
  @Action(ImpactMatrixAction.Export, { cancelUncompleted: true })
  export({}: StateContext<ImpactMatrixStateModel>, { payload }: ImpactMatrixAction.Export) {
    return this.impactMatrix
      .export8({
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
            `BUSINESS IMPACT ANALYSIS MATRIX - ${new Date().toISOString().split('.')[0]}`
          );
        })
      );
  }
}
