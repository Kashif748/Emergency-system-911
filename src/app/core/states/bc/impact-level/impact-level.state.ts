import {
  Action,
  Selector,
  SelectorOptions,
  State,
  StateContext,
  StateToken,
} from '@ngxs/store';
import { Injectable } from '@angular/core';
import { EMPTY } from 'rxjs';
import { catchError, finalize, tap } from 'rxjs/operators';
import { patch } from '@ngxs/store/operators';
import { BcImpactLevelControllerService } from 'src/app/api/services';
import { ImpactLevelAction } from './impact-level.action';
import { PageBcImpactLevel } from '../../../../api/models/page-bc-impact-level';
import { BcImpactLevel } from '../../../../api/models/bc-impact-level';
import { BCState } from '@core/states';

export interface ImpactLevelStateModel {
  page: PageBcImpactLevel;
  impactLevel: BcImpactLevel;
  loading: boolean;
  blocking: boolean;
}

const IMPACT_LEVEL_STATE_TOKEN = new StateToken<ImpactLevelStateModel>(
  'impact_level'
);

@State<ImpactLevelStateModel>({ name: IMPACT_LEVEL_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ImpactLevelState {
  /**
   *
   */
  constructor(private impactLevel: BcImpactLevelControllerService) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ImpactLevelState])
  static page(state: ImpactLevelStateModel): BcImpactLevel[] {
    return state?.page?.content;
  }

  @Selector([ImpactLevelState])
  static impactLevel(state: ImpactLevelStateModel) {
    return state?.impactLevel;
  }

  @Selector([ImpactLevelState])
  static totalRecords(state: ImpactLevelStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ImpactLevelState])
  static loading(state: ImpactLevelStateModel) {
    return state?.loading;
  }

  @Selector([ImpactLevelState])
  static blocking(state: ImpactLevelStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ImpactLevelAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ImpactLevelStateModel>,
    { payload }: ImpactLevelAction.LoadPage
  ) {
    if (payload.versionId === undefined || payload.versionId === null) {
      return;
    }
    setState(
      patch<ImpactLevelStateModel>({
        loading: true,
      })
    );

    return this.impactLevel
      .getAll19({
        versionId: payload.versionId,
        isActive: payload.isActive,
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
            patch<ImpactLevelStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ImpactLevelStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ImpactLevelStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ImpactLevelAction.Create)
  create(
    { setState }: StateContext<ImpactLevelStateModel>,
    { payload }: ImpactLevelAction.Create
  ) {
    setState(
      patch<ImpactLevelStateModel>({
        blocking: true,
      })
    );

    return this.impactLevel
      .insertOne23({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ImpactLevelStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
  @Action(ImpactLevelAction.Update)
  update(
    { setState }: StateContext<ImpactLevelStateModel>,
    { payload }: ImpactLevelAction.Update
  ) {
    setState(
      patch<ImpactLevelStateModel>({
        blocking: true,
      })
    );

    return this.impactLevel
      .update103({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ImpactLevelStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ImpactLevelAction.GetImpactLevel, { cancelUncompleted: true })
  getImpactLevel(
    { setState }: StateContext<ImpactLevelStateModel>,
    { payload }: ImpactLevelAction.GetImpactLevel
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ImpactLevelStateModel>({
          impactLevel: undefined,
        })
      );
      return;
    }
    setState(
      patch<ImpactLevelStateModel>({
        blocking: true,
      })
    );
    return this.impactLevel.getOne23({ id: payload.id }).pipe(
      tap((impactLevel) => {
        setState(
          patch<ImpactLevelStateModel>({
            impactLevel: impactLevel.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ImpactLevelStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
