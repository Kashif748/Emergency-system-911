import {PageBcImpactLevel} from "../../../../api/models/page-bc-impact-level";
import {BcImpactLevel} from "../../../../api/models/bc-impact-level";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {EMPTY} from "rxjs";
import {catchError, finalize, tap} from "rxjs/operators";
import {patch} from "@ngxs/store/operators";
import {RtoAction} from "@core/states";
import {BcImpactLevelControllerService} from "../../../../api/services/bc-impact-level-controller.service";
import {ImpactLevelAction} from "@core/states/bc/impact-level/impact-level.action";
import {BrowseBusinessContinuityState} from "../../../../modules/_business-continuity/states/browse-business-continuity.state";


export interface ImpactLevelStateModel {
  page: PageBcImpactLevel;
  impactLevel: BcImpactLevel;
  loading: boolean;
  blocking: boolean;
}

const IMPACT_LEVEL_STATE_TOKEN = new StateToken<ImpactLevelStateModel>('impactLevel');

@State<ImpactLevelStateModel>({ name: IMPACT_LEVEL_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })

export class ImpactLevelState {
  /**
   *
   */
  constructor(
    private impactLevel: BcImpactLevelControllerService,
    private store: Store,
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([ImpactLevelState])
  static page(state: ImpactLevelStateModel) {
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
    setState(
      patch<ImpactLevelStateModel>({
        loading: true,
      })
    );
    const versionID = this.store.selectSnapshot(BrowseBusinessContinuityState.versionId);
    return this.impactLevel
      .getAll18({
        // isActive: true,
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
    const versionID = this.store.selectSnapshot(BrowseBusinessContinuityState.versionId);
    payload.versionId = versionID;
    return this.impactLevel
      .insertOne9({
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
    return this.impactLevel.getOne9({ id: payload.id }).pipe(
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
