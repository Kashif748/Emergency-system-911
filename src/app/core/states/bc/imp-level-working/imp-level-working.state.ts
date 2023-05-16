import {BcWorkImportanceLevels} from "../../../../api/models/bc-work-importance-levels";
import {Action, Selector, SelectorOptions, State, StateContext, StateToken} from "@ngxs/store";
import {Injectable} from "@angular/core";
import {BcWorkImportanceLevelsControllerService} from "../../../../api/services/bc-work-importance-levels-controller.service";
import {patch} from "@ngxs/store/operators";
import {catchError, finalize, tap} from "rxjs/operators";
import {EMPTY} from "rxjs";
import {ImpLevelWorkingAction} from "@core/states/bc/imp-level-working/imp-level-working.action";
import {RtoStateModel} from "@core/states/bc/rto/rto.state";
import {PageBcWorkImportanceLevels} from "../../../../api/models/page-bc-work-importance-levels";


export interface ImpLevelWorkingStateModel {
  page: PageBcWorkImportanceLevels;
  ImpLevelWorking: BcWorkImportanceLevels;
  loading: boolean;
  blocking: boolean;
}

const IMP_LEVEL_WORKING_STATE_TOKEN = new StateToken<ImpLevelWorkingStateModel>('impLevelWorking');

@State<ImpLevelWorkingStateModel>({ name: IMP_LEVEL_WORKING_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })

export class ImpLevelWorkingState {
  /**
   *
   */
  constructor(
    private impLevelWorking: BcWorkImportanceLevelsControllerService
  ) {
  }

  /* ************************ SELECTORS ******************** */
  @Selector([ImpLevelWorkingState])
  static page(state: ImpLevelWorkingStateModel) {
    return state?.page?.content;
  }

  @Selector([ImpLevelWorkingState])
  static ImpLevelWorking(state: ImpLevelWorkingStateModel) {
    return state?.ImpLevelWorking;
  }

  @Selector([ImpLevelWorkingState])
  static totalRecords(state: ImpLevelWorkingStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ImpLevelWorkingState])
  static loading(state: ImpLevelWorkingStateModel) {
    return state?.loading;
  }

  @Selector([ImpLevelWorkingState])
  static blocking(state: ImpLevelWorkingStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ImpLevelWorkingAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ImpLevelWorkingStateModel>,
    { payload }: ImpLevelWorkingAction.LoadPage
  ) {
    setState(
      patch<ImpLevelWorkingStateModel>({
        loading: true,
      })
    );
    return this.impLevelWorking
      .getAll15({
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
            patch<ImpLevelWorkingStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ImpLevelWorkingStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ImpLevelWorkingStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ImpLevelWorkingAction.Create)
  create(
    { setState }: StateContext<ImpLevelWorkingStateModel>,
    { payload }: ImpLevelWorkingAction.Create
  ) {
    setState(
      patch<ImpLevelWorkingStateModel>({
        blocking: true,
      })
    );
    return this.impLevelWorking
      .insertOne6({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ImpLevelWorkingStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ImpLevelWorkingAction.GetImpLevelWorking, { cancelUncompleted: true })
  getRto(
    { setState }: StateContext<ImpLevelWorkingStateModel>,
    { payload }: ImpLevelWorkingAction.GetImpLevelWorking
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ImpLevelWorkingStateModel>({
          ImpLevelWorking: undefined,
        })
      );
      return;
    }
    setState(
      patch<RtoStateModel>({
        blocking: true,
      })
    );
    return this.impLevelWorking.getOne6({ id: payload.id }).pipe(
      tap((rto) => {
        setState(
          patch<ImpLevelWorkingStateModel>({
            ImpLevelWorking: rto.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ImpLevelWorkingStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
}
