import {Action, Selector, SelectorOptions, State, StateContext, StateToken, Store,} from '@ngxs/store';
import {Injectable} from '@angular/core';
import {patch} from '@ngxs/store/operators';
import {catchError, finalize, tap} from 'rxjs/operators';
import {EMPTY} from 'rxjs';
import {PageBcResources} from "../../../api/models/page-bc-resources";
import {BcResources} from "../../../api/models/bc-resources";
import {BcResourcesControllerService} from "../../../api/services/bc-resources-controller.service";
import {ResourceAnalysisAction} from "@core/states/impact-analysis/resource-analysis.action";

export interface ResourceAnalysisStateModel {
  page: PageBcResources;
  resourceAnalysis: BcResources;
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
  constructor(private bcResources: BcResourcesControllerService, private store: Store) {}

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
        cycleId: payload.cycleId,
        orgHierarchyId: payload.orgHierarchyId,
        pageable: {
          page: payload.page,
          size: payload.size,
          sort: payload.sort,
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
      .update93({
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
}
