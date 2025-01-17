import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {patch} from '@ngxs/store/operators';
import {catchError, finalize, map, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {PageBcResources} from "../../../api/models/page-bc-resources";
import {BcResources} from "../../../api/models/bc-resources";
import {BcResourcesControllerService} from "../../../api/services/bc-resources-controller.service";
import {ResourceAnalysisAction} from "@core/states/impact-analysis/resource-analysis.action";
import {BcCycles} from "../../../api/models";
import {BcCyclesControllerService} from "../../../api/services";

export enum RESOURCE_STATUSES {
  DRAFT = 1,
  UNDER_REVIEW,
  REVIEWED,
  UNDER_APPROVAL,
  APPROVED,
  ACTIVE,
  EXPIRED,
}

export interface ResourceAnalysisStateModel {
  page: PageBcResources;
  resourceAnalysis: BcResources;
  cycle: BcCycles;
  loading: boolean;
  blocking: boolean;
}

const RESOURCE_ANALYSIS_STATE_TOKEN = new StateToken<ResourceAnalysisStateModel>('resource_analysis');

@State<ResourceAnalysisStateModel>({ name: RESOURCE_ANALYSIS_STATE_TOKEN })
@Injectable()
@SelectorOptions({ injectContainerState: false })
export class ResourceAnalysisState {
  /**
   *
   */
  constructor(private bcResources: BcResourcesControllerService, private store: Store,
              private cyclesController: BcCyclesControllerService) {}

  /* ************************ SELECTORS ******************** */
  @Selector([ResourceAnalysisState])
  static page(state: ResourceAnalysisStateModel) {
    return state?.page?.content;
  }

  @Selector([ResourceAnalysisState])
  static resourceAnalysis(state: ResourceAnalysisStateModel) {
    return state?.resourceAnalysis;
  }

  @Selector([ResourceAnalysisState])
  static cycle(state: ResourceAnalysisStateModel) {
    return state?.cycle;
  }

  @Selector([ResourceAnalysisState])
  static totalRecords(state: ResourceAnalysisStateModel) {
    return state?.page?.totalElements;
  }

  @Selector([ResourceAnalysisState])
  static loading(state: ResourceAnalysisStateModel) {
    return state?.loading;
  }

  @Selector([ResourceAnalysisState])
  static blocking(state: ResourceAnalysisStateModel) {
    return state?.blocking;
  }

  /* ********************** ACTIONS ************************* */
  @Action(ResourceAnalysisAction.LoadPage, { cancelUncompleted: true })
  loadPage(
    { setState }: StateContext<ResourceAnalysisStateModel>,
    { payload }: ResourceAnalysisAction.LoadPage
  ) {
    setState(
      patch<ResourceAnalysisStateModel>({
        loading: true,
      })
    );
    return this.bcResources
      .search10({
        isActive: true,
        cycleId: payload.filters?.cycleId['id'],
        orgHierarchyId: payload.filters.orgHierarchyId,
        statusId: payload.filters.activityAnalysisStatusId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort ? payload.sort : ['id', 'desc'],
        },
      })
      .pipe(
        tap((res) => {
          setState(
            patch<ResourceAnalysisStateModel>({
              page: res.result,
              loading: false,
            })
          );
        }),
        catchError(() => {
          setState(
            patch<ResourceAnalysisStateModel>({
              page: { content: [], totalElements: 0 },
            })
          );
          return EMPTY;
        }),
        finalize(() => {
          setState(
            patch<ResourceAnalysisStateModel>({
              loading: false,
            })
          );
        })
      );
  }

  @Action(ResourceAnalysisAction.Create)
  create(
    { setState }: StateContext<ResourceAnalysisStateModel>,
    { payload }: ResourceAnalysisAction.Create
  ) {
    setState(
      patch<ResourceAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.bcResources
      .insertOne14({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ResourceAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ResourceAnalysisAction.Update)
  update(
    { setState }: StateContext<ResourceAnalysisStateModel>,
    { payload }: ResourceAnalysisAction.Update
  ) {
    setState(
      patch<ResourceAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.bcResources
      .update95({
        body: payload,
      })
      .pipe(
        finalize(() => {
          setState(
            patch<ResourceAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }

  @Action(ResourceAnalysisAction.GetResourceAnalysis, { cancelUncompleted: true })
  getResource(
    { setState }: StateContext<ResourceAnalysisStateModel>,
    { payload }: ResourceAnalysisAction.GetResourceAnalysis
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ResourceAnalysisStateModel>({
          resourceAnalysis: undefined,
        })
      );
      return;
    }
    setState(
      patch<ResourceAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.bcResources.getOne5({ id: payload.id }).pipe(
      tap((resource) => {
        setState(
          patch<ResourceAnalysisStateModel>({
            resourceAnalysis: resource.result,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ResourceAnalysisStateModel>({
            blocking: false,
          })
        );
      })
    );
  }
  @Action(ResourceAnalysisAction.GetCycle, { cancelUncompleted: true })
  GetCycle(
    { setState }: StateContext<ResourceAnalysisStateModel>,
    { payload }: ResourceAnalysisAction.GetCycle
  ) {
    if (payload.id === undefined || payload.id === null) {
      setState(
        patch<ResourceAnalysisStateModel>({
          cycle: undefined,
        })
      );
      return;
    }
    setState(
      patch<ResourceAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.cyclesController.getOne24({ id: payload.id }).pipe(
      map((response) => response.result),
      tap((cycle) => {
        setState(
          patch<ResourceAnalysisStateModel>({
            cycle,
          })
        );
      }),
      finalize(() => {
        setState(
          patch<ResourceAnalysisStateModel>({
            blocking: false,
          })
        );
      })
    );
  }

  @Action(ResourceAnalysisAction.ChangeStatus, { cancelUncompleted: true })
  ChangeStatus(
    { setState }: StateContext<ResourceAnalysisStateModel>,
    { payload }: ResourceAnalysisAction.ChangeStatus
  ) {
    setState(
      patch<ResourceAnalysisStateModel>({
        blocking: true,
      })
    );
    return this.bcResources
      .changeStatus({ body: payload })
      .pipe(
        tap((res) => {
          console.log(res);
        }),
        finalize(() => {
          setState(
            patch<ResourceAnalysisStateModel>({
              blocking: false,
            })
          );
        })
      );
  }
}
