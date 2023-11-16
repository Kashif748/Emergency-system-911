import {Action, Selector, SelectorOptions, State, StateContext, StateToken,} from '@ngxs/store';
import {finalize, map, tap} from 'rxjs/operators';
import {patch} from '@ngxs/store/operators';
import {Injectable} from '@angular/core';
import {BcActivityAnalysis, BcAnalysisStatus, BcCycles, PageBcActivityAnalysis, PageBcCycles} from 'src/app/api/models';
import {
  BcAcitivityAnalysisStatusControllerService,
  BcActivitiesControllerService,
  BcActivityAnalysisControllerService,
  BcCyclesControllerService,
} from 'src/app/api/services';
import {ImapactAnalysisAction} from './impact-analysis.action';
import {BcAnalysisControllerService} from "../../../api/services/bc-analysis-controller.service";
import {BcAnalysisStatusDetails} from "../../../api/models/bc-analysis-status-details";
import {RtoStateModel} from "@core/states/bc/rto/rto.state";

export interface ImpactAnalysisStateModel {
  activityAnalysisPage: PageBcActivityAnalysis;
  cyclesPage: PageBcCycles;
  activityStatuses: BcAnalysisStatus[];
  ImpactAnalysis: BcActivityAnalysis;
  cycle: BcCycles;
  statusbasedOnId: BcAnalysisStatus;
  loadAnalysisStatus: BcAnalysisStatusDetails;
  loading: boolean;
  blocking: boolean;
}

const IMPACT_ANALYSIS_STATE_TOKEN = new StateToken<ImpactAnalysisState>(
  'impact_analysis'
);

@State<ImpactAnalysisState>({ name: IMPACT_ANALYSIS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ImpactAnalysisState {
  /**
   *
   */
  constructor(
    private activitiesController: BcActivitiesControllerService,
    private activitiesAnalysisController: BcActivityAnalysisControllerService,
    private cyclesController: BcCyclesControllerService,
    private statusController: BcAcitivityAnalysisStatusControllerService,
    private sendController: BcAnalysisControllerService
  ) {}

  /* ************************ SELECTORS ******************** */
  // activity Analysis
  @Selector([ImpactAnalysisState])
  static activityAnalysisPage(state: ImpactAnalysisStateModel) {
    return state?.activityAnalysisPage.content;
  }

  @Selector([ImpactAnalysisState])
  static totalRecords(state: ImpactAnalysisStateModel) {
    return state?.activityAnalysisPage?.totalElements;
  }

  @Selector([ImpactAnalysisState])
  static ImpactAnalysis(state: ImpactAnalysisStateModel) {
    return state?.ImpactAnalysis;
  }

  @Selector([ImpactAnalysisState])
  static cycle(state: ImpactAnalysisStateModel) {
    return state?.cycle;
  }

  @Selector([ImpactAnalysisState])
  static isBCAnalysisStatusSimiliar(state: ImpactAnalysisStateModel) {
    return state?.loadAnalysisStatus.isBCAnalysisStatusSimiliar;
  }

  @Selector([ImpactAnalysisState])
  static loadAnalysisStatus(state: ImpactAnalysisStateModel) {
    return state?.loadAnalysisStatus.status;
  }

  @Selector([ImpactAnalysisState])
  static statusbasedOnId(state: ImpactAnalysisStateModel) {
    return state?.statusbasedOnId;
  }

  @Selector([ImpactAnalysisState])
  static cycles(state: ImpactAnalysisStateModel) {
    return state?.cyclesPage.content;
  }

  @Selector([ImpactAnalysisState])
  static loading(state: ImpactAnalysisStateModel) {
    return state?.loading;
  }

  @Selector([ImpactAnalysisState])
  static blocking(state: ImpactAnalysisStateModel) {
    return state?.blocking;
  }

  @Selector([ImpactAnalysisState])
  static activityStatuses(state: ImpactAnalysisStateModel) {
    return state?.activityStatuses;
  }
  /* ********************** ACTIONS ************************* */
  @Action(ImapactAnalysisAction.LoadPage, { cancelUncompleted: true })
  LoadPage(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload }: ImapactAnalysisAction.LoadPage
  ) {
    setState(
      patch<ImpactAnalysisStateModel>({
        loading: true,
      })
    );
    return this.activitiesAnalysisController
      .search27({
        pageable: {
          page: payload?.page,
          size: payload?.size,
          sort: payload.sort ? payload.sort : ['id', 'desc'],
        },
        ...payload.filters,
        cycleId: payload.filters?.cycleId['id'],
      })
      .pipe(
        tap((bc) => {
          setState(
            patch<ImpactAnalysisStateModel>({
              activityAnalysisPage: bc.result,
              loading: false,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<ImpactAnalysisStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ImapactAnalysisAction.LoadCycles, { cancelUncompleted: true })
  LoadCycles(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload }: ImapactAnalysisAction.LoadCycles
  ) {
    return this.cyclesController
      .getAll20({
        isActive: true,
        pageable: {
          page: payload?.page,
          size: payload?.size,
        },
      })
      .pipe(
        tap((bc) => {
          setState(
            patch<ImpactAnalysisStateModel>({
              cyclesPage: bc.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<ImpactAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ImapactAnalysisAction.LoadAnalysisStatusInfo, { cancelUncompleted: true })
  loadAnalysisStatusInfo(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload }: ImapactAnalysisAction.LoadAnalysisStatusInfo
  ) {
    return this.sendController
      .analysisStatusInfo({
          cycleId: payload.cycleId,
          orgHierarchyId: payload.orgHierarchyId,
        },
      )
      .pipe(
        tap((bc) => {
          setState(
            patch<ImpactAnalysisStateModel>({
              loadAnalysisStatus: bc.result,
            })
          );
        }),
        finalize(() => {
          setState(
            patch<ImpactAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ImapactAnalysisAction.UpdateBulkTransaction, {cancelUncompleted: true,})
  bulkTransaction(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload }: ImapactAnalysisAction.UpdateBulkTransaction
  ) {
    setState(
      patch<ImpactAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.sendController
      .bulkTransaction({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<RtoStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ImapactAnalysisAction.LoadActivitiesStatuses, {
    cancelUncompleted: true,
  })
  LoadActivitiesStatuses(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    {}: ImapactAnalysisAction.LoadActivitiesStatuses
  ) {
    return this.statusController.list8().pipe(
      tap((bc) => {
        setState(
          patch<ImpactAnalysisStateModel>({
            activityStatuses: bc.result,
          })
        );
      })
    );
  }

  @Action(ImapactAnalysisAction.LoadStatusBasedOnStatusId, {
    cancelUncompleted: true,
  })
  loadStatusBasedOnStatusId(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload  }: ImapactAnalysisAction.LoadStatusBasedOnStatusId
  ) {
    return this.statusController.getOne37({
      id: payload.id
    }).pipe(
      tap((bc) => {
        setState(
          patch<ImpactAnalysisStateModel>({
            statusbasedOnId: bc.result,
          })
        );
      })
    );
  }

  @Action(ImapactAnalysisAction.GetActivityAnalysis, {
    cancelUncompleted: true,
  })
  GetActivityAnalysis(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload }: ImapactAnalysisAction.GetActivityAnalysis
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ImpactAnalysisStateModel>({
          ImpactAnalysis: undefined,
        })
      );
      return;
    }
    setState(
      patch<ImpactAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.activitiesAnalysisController.getOne34({ id: payload.id }).pipe(
      tap((bc) => {
        setState(
          patch<ImpactAnalysisStateModel>({
            ImpactAnalysis: bc.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ImpactAnalysisStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(ImapactAnalysisAction.GetCycle, { cancelUncompleted: true })
  GetCycle(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload }: ImapactAnalysisAction.GetCycle
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ImpactAnalysisStateModel>({
          cycle: undefined,
        })
      );
      return;
    }
    setState(
      patch<ImpactAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.cyclesController.getOne24({ id: payload.id }).pipe(
      map((response) => response.result),
      tap((cycle) => {
        setState(
          patch<ImpactAnalysisStateModel>({
            cycle,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ImpactAnalysisStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
  @Action(ImapactAnalysisAction.CreateCycle)
  CreateCycle(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload }: ImapactAnalysisAction.CreateCycle
  ) {
    setState(
      patch<ImpactAnalysisStateModel>({
        blocking: true,
      })
    );

    return this.cyclesController
      .insertOne24({
        body: { ...payload },
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ImpactAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ImapactAnalysisAction.SetCycleActivities)
  SetCycleActivities(
    { setState }: StateContext<ImpactAnalysisStateModel>,
    { payload }: ImapactAnalysisAction.SetCycleActivities
  ) {
    setState(
      patch<ImpactAnalysisStateModel>({
        blocking: true,
      })
    );

    return this.activitiesAnalysisController
      .saveAll({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ImpactAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
